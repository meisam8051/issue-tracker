//7-64-Assigning an Issue to a User 

"use client"

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Skeleton } from "@/app/components"

//5-we get it and type it
const AssigneeSelect = ({ issue }: { issue: Issue }) => {


    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })


    if (isLoading) return <Skeleton />
    if (error) return null



    return (
        <Select.Root
        //10-When the page loads we want to show the currently assigned 
        //user.For that we use defaultValue prop.If this value is truthy, 
        //we're going to use that, otherwise if it's null, we use an 
        //empty string.So the unassigned item gets selected.
            defaultValue={issue.assignedToUserId || ""}
            onValueChange={(userId) => {
                axios.patch("/api/issues/" + issue.id, { 
                    //9-For unassigning when we select the unassigned item,
                    //userId equals to empty string and that is falsy 
                    //value for assignedToUserId.we add null to unassign
                    //issue.(fig 64-4 64-5)
                    assignedToUserId: userId || null })
           
           }}>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {/*8-For unassigning an issue,First we add an item 
                    before the list of users.We set the value to an 
                    empty string, we cannot set it to null, that's not 
                    acceptable.  */}
                    <Select.Item value="" >Unassigned</Select.Item>
                    {users?.map((user) => {
                        return (<Select.Item key={user.id}
                            value={user.id}>{user.name}</Select.Item>)
                    })}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}


export default AssigneeSelect