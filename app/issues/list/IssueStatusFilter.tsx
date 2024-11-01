// 9-71-Fix Filtering Bugs


"use client"

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
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

    const router = useRouter()

    const searchParams = useSearchParams()

    return (
        <Select.Root
        //6-The other issue we have here is that the filter that we 
        //select here, like open, doesn't get set if we refresh the 
        //page.To solve that we have to set the defaultValue prop.
        //(fig 71-3)
        //Here if we don't have a status, then we should set the default 
        //value to an empty string, So the first item, which is All get 
        //selected.
        defaultValue={searchParams.get("status") || ""}
            onValueChange=
            {(status) => {

                const params = new URLSearchParams()
                if (status)
                    params.append("status", status)
                if (searchParams.get("orderBy"))
                    params.append("orderBy", searchParams.get("orderBy")!)


                const currentSearchParams = searchParams.get("orderBy")
                console.log(currentSearchParams)

                const query = params.size ? "?"+params.toString() : ""
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


export default IssueStatusFilter