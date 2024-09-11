//4-25-Building the Issue status Badge

import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

//5-b)A better and more elegant solution is to use a "map object".So 
//outside of this component, we want to define mapping between "issue 
//statuses" and their "colors" and "labels".the reason I defined this 
//mapping outside of this component is because we don't need this every
//time we want to render a component.

const statusMap: Record<
    Status,
    { label: string, color: "red" | "violet" | "green" }> = {
    OPEN: { label: "Open", color: "red" },
    In_PROGRESS: { label: "In Progrees", color: "violet" },
    CLOSED: { label: "Closed", color: "green" }
}
//6-"Record" is one of the utility types in TypeScript that allows us to 
//define "key value pairs" where "keys" and "values" have a "particular 
//type".And in angle brackets, we should specify "the type of our keys and 
//values".Here we want to use "Status type" as our "key types" and an 
//object with two properties,"label" and "color" that both are "string".
//But because our "color prop" in "Badge component" can only accept 
//certain values like red, green, blue and so on.We cannot set it to a 
//"random string".we have to set the type of the color property to a set 
//of predefined values that we used here.(here red, violet and green)

//7-Now with this annotation, we can set this "statusMap constant" to an 
//object with these properties.


const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        //8-we use the status that we get from outside and use it in 
        //statusMap object to show the valid Badge. 
        //Go to app/issues/page copy 6.tsx
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge