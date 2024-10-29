// 9-68-Filtering Issues


"use client"

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { stat } from 'node:fs'
import React from 'react'

const statuses: {
    label: string,
    value?: Status
}[] = [
        { label: "All" },
        { label: "Open", value: 'OPEN' },
        { label: "In Progress", value: 'In_PROGRESS' },
        { label: "Closed", value: 'CLOSED' }
    ]

const IssueStatusFilter = () => {
    //2-So we call use router.
    const router = useRouter()

    //1-when the user selects a status, we should pass that status as a 
    //query parameter in the URL of the page.

    return (
        <Select.Root
            //2-
            onValueChange=
            {(status) => {
                const query = status ? "?status=" + status : ""
                //2-here we need to use the next JS router to redirect 
                //the user.
                router.push(`/issues/list${query}`)
            }}>
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content>
                {statuses.map(status => {
                    return <Select.Item
                        key={status.label}
                        value={status.value || ""}
                    >
                        {status.label}
                    </Select.Item>
                })}
            </Select.Content>
        </Select.Root>
    )
}
//Go to issues/list/page copy 17.tsx

export default IssueStatusFilter