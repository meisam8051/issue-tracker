//7-58-Building the Assignee Select Component
"use client"

import { Select } from '@radix-ui/themes'
import React from 'react'

//1-(fig 58-2)(fig 58-3)
const AssigneeSelect = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value='1'>Meisam Garshasbi</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}
// Go to app/issues/[id]page copy 14.tsx

export default AssigneeSelect