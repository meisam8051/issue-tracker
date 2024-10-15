//4-25-Building the Issue status Badge
//2-------------------------------
import { Status,Issue } from '@prisma/client'
//--------------------------------
import React from 'react'

//1-Now the reason we add this component here in "component folder" is 
//because we're going to use this in "multiple pages" on the "issues 
//page" and on the "issue details page".

//2-Now this component should receive "the status of an issue as a prop".
//The type of this status is the "Status" that is defined in "Prisma 
//client".(fig 25-2)

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <div >IssueStatusBadge</div>
    )
}
//3-So here's the interesting thing about Prisma.Every time we create or 
//modify our models and create a migration, Prisma CLI automatically 
//generates "types based on our models".So in this module, we have a type 
//called "Status".So Status is a type that is a union of these three 
//values.(fig 25-2)
//In this module, Prisma/client, we also have a type for "our issues".So 
//the issue type is an object with these properties, ID, title and so 
//on.(fig 25-3)
//Go to IssueStatusBadge copy 2.tsx
export default IssueStatusBadge