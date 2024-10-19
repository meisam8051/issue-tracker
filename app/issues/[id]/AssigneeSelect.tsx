// 7-59-Populating the Assignee Select Component

"use client"

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const AssigneeSelect = () => {
    //1-to populate our select component with the actual users in our 
    //database, first we have to build an API endpoint,and have this 
    //component fetch the users at runtime. because this is a client 
    //component and we cannot access Prisma in the client component.
    //Go to api/users/route copy.ts

    //4-we declare a state variable for storing our users.Now here we 
    //can specify the type of our users by adding in the brackets.
    const [users, setUsers] = useState<User[]>([])


    //5-
    useEffect(() => {
        const fetchUsers = async () => {
            //Here we specify the type of data we expect to get.
            const { data } = await axios.get<User[]>("/api/users")
            setUsers(data)
        }
        fetchUsers()
    }, [])

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {/* 6- */}
                    {users.map((user) => {
                        return (<Select.Item key={user.id}
                            value={user.id}>{user.name}</Select.Item>)
                    })}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}


export default AssigneeSelect