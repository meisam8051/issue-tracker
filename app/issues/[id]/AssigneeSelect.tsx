//8-66-Refactoring the Assignee Select Component

"use client"

import { Skeleton } from "@/app/components"
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import toast, { Toaster } from "react-hot-toast"


const AssigneeSelect = ({ issue }: { issue: Issue }) => {

//2-
    const { data: users, error, isLoading } = useUser()


    if (isLoading) return <Skeleton />
    if (error) return null

    //1-
    const assignIssue = (userId: string) => {
        axios.patch("/api/issues/" + issue.id, {
            assignedToUserId: userId || null
        })
            .catch(
                () => {
                    toast.error("Changes could not be saved.")
                })

    }


    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                // 1-
                onValueChange={assignIssue}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="" >Unassigned</Select.Item>
                        {users?.map((user) => {
                            return (<Select.Item key={user.id}
                                value={user.id}>{user.name}</Select.Item>)
                        })}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

//2-because this is the only place where we need this logic for fetching
// a list of users and caching them.So there is not much value in taking 
//this logic outside of this component.
//We can still take this piece of logic and put it in a custom hook 
//within this module,this will make this code slightly cleaner.
const useUser = () => {
    return useQuery<User[]>({
        queryKey: ["users"],
        //4-we can move this axios call inside a separate function like 
        //get users.And put it in a single file where we have
        //all our API calls.But we don't have that requirement at this 
        //point.it's always better to fix today's problems as opposed to 
        //problems in the future.That might never happen.

        //5-what if our endpoints change?With this approach, we have 
        //multiple places where we have a call to /api/users.So wouldn't 
        //that be nicer to put this inside a separate function?So we have
        //a single place where we specify our endpoints.
        //But your endpoints shouldn't change to start with.So this end 
        //point is essentially a contract that our application is 
        //exposing to the outside world.

        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000,//3-the 60 seconds is too short.Because We're 
        //assuming this application is an internal application for an 
        //organization and we're not going to get a lot of new users in 
        //a short period of time.So it's safe to use a longer value here,
        //like 10 minutes or an hour or even one day.It depends on our 
        //application and its requirements.

        retry: 3
    })
}


export default AssigneeSelect