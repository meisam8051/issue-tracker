//8-65-Showing Toast Notifications 

"use client"

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Skeleton } from "@/app/components"
//1-Import the toast object and the Toaster component.
import toast, { Toaster } from "react-hot-toast"


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
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={(userId) => {
                    //3-to handle errors, here we have to await this patch 
                    //call so we can wrap it in a Try-Catch block.Or instead
                    //we can use catch method to get an error.
                    axios.patch("/api/issues/" + issue.id, {
                        assignedToUserId: userId || null
                    })
                        .catch(
                            //4-we pass a callback function to it
                            () => { 
                            //in this function we use the Toast 
                            //object that we imported on the top to show 
                            //an error.So here we call the error method 
                            //and provide a message.
                            toast.error("Changes could not be saved.") 
                        })
                        //5-To simulate it we change the url of patch
                        //method.(fig 65-1)
                        //6-you have full control over customizing the 
                        //toast notification in terms of the duration 
                        //and look and feel.Go to 
                        //https://react-hot-toast.com/

                }}>
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
            {/* 2-somewhere in this component we have to add this Toaster 
        component as a container for showing a Toast notification. */}
            <Toaster />
        </>
    )
}


export default AssigneeSelect