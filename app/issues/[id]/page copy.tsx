//4-27-Showing Issue Details
import prisma from '@/prisma/client'
//3-----------
import { notFound } from 'next/navigation'
//3-----------
import React from 'react'

//1---------
interface Props {
    params: { id: string }
    //all the values that we have in the route are "string values" by 
    //default.
}

const IssueDetailPage = async ({ params }: Props) => {
    //2----------
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    //3-we say if issue doesn't exist, here we call the "notFound function"
    //to redirect the user to "the notFound page".we just call this
    //function,We "don't" have to use "a return statement" because the 
    //return type of this function is "never", so it doesn't return any 
    //values.
    if (!issue)
        notFound()

    return (
        //4----------------
        //Go to app/issues/page copy 9.tsx
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.creatdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailPage