//5-41-Adding a Delete Button

import { Button } from '@radix-ui/themes'
import React from 'react'

//1-This component should take the issue ID as a prop for deleting the 
//specified issue.
const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button color='red'>Delete Issue</Button>
    )
}
//Go to issues/[id]/page copy 10.tsx
export default DeleteIssueButton