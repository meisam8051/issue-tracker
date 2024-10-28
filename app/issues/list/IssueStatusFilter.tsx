// 9-67-Building the Filter Component

//Because we use select. we have to do it client component.
"use client"

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

//3-we can use TypeScript to make sure that the value that we set here 
//is a valid status.So we need to annotate this object with its type, 
//we want this to be an array of objects.And the type of value property
//should be the type of or Status model in our databse.
const statuses: {
    label: string,
    value?: Status//this structure makes perfect sense because the first 
    //item, the first element, doesn't represent a particular status.
}[] = [
        { label: "All" },//By doing the value property optional we can define
        //our ALL item.
        { label: "Open", value: 'OPEN' },
        { label: "In Progress", value: 'In_PROGRESS' },
        { label: "Closed", value: 'CLOSED' }
    ]

const IssueStatusFilter = () => {
    return (
        //1-Here we add a select component
        <Select.Root>
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content>
                {/* 2-here we should add a bunch of select items.
                    So somewhere we want to store all the statuses and 
                    then we can map each status to a select item.*/}
                {/* 4- */}
                {statuses.map(status => {
                    return <Select.Item
                        key={status.label}
                        value={status.value || ""}
                    //5-the value prop expects a string but because we 
                    //declared the value property as optional,it can 
                    //be undefined.So we add "" here.So the first item
                    //in our list, its value is going to be an empty 
                    //string.
                    >
                        {status.label}
                    </Select.Item>
                })}
            </Select.Content>
        </Select.Root>
    )
}
//Go to issues/list/IssueActions copy 2.tsx

export default IssueStatusFilter