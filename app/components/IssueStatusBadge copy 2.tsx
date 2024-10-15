//4-25-Building the Issue status Badge

import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'


//4-Now, in this component, we're going to return a "badge component".But 
//here's the thing.The "color" and the "label" of the Badge component,
//should be dependent on the our argument, "status" .
//we have two solutions.A)One solution is to have a bunch of 
//if statements like this: if(status === "OPEN")
//return <Badge color="red">Open</Badge>

//Go to IssueStatusBadge copy 3.tsx


const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge></Badge>
    )
}

export default IssueStatusBadge