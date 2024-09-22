//5-35- Applying the Single Responsibility Principle
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'
import React from 'react'
//2-Here we create EditIssueButton component that is one piece of our 
//detail issue page.

//3-this component needs to know the idea of the issue to edit.We can 
//give it as a prop.
//Go to ./IssueDetails.tsx
const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
        </Button>
    )
}

export default EditIssueButton