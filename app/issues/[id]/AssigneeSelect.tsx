//7-61-Fetching Data with React Query

"use client"

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Skeleton } from "@/app/components"


const AssigneeSelect = () => {

    //1-First we use useQuery().we should specify the type of data or
    //users we get as one of the our output.
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ["users"],//that is used for uniquely identifying a 
        //piece of data in the cache.we set it to an array with a unique
        //name.
        queryFn: () => axios.get("/api/users").then(res => res.data),
        //this is a function that is used for fetching data.So React
        //Query itself doesn't fetch data.It uses our fetch function 
        //to fetch the data and store it in its cache.
        staleTime: 60 * 1000,//It is the time that react-query try to 
        //refetch the data from database. The default value is zero.
        retry: 3 //This is for retrying the request to the backend.(fig
        //61-1)
    })

    //3-----------
    if (isLoading) return <Skeleton />
    //So if we have an error after three retries, then we can return null.
    //So we are not going to render the AssigneeSelect component.
    if (error) return null


    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {/*2-Because initially when this component is rendered
                    , users is undefined until we fetch data from the 
                    backend.So here we have to use optional chaining.*/}
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