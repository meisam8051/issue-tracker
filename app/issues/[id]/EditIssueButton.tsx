//6-47-Removing Duplicate Skeletons
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button>
            <Pencil2Icon />
            {/* 6-Here we chould change the url */}
            <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
        </Button>
    )
}

export default EditIssueButton