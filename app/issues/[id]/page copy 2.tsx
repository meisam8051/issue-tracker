//4-27-Showing Issue Details
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'


interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
 
    //8-Or If we want to redirect the user to the 404 page, here we 
    //validate the type of the ID parameter before using it to fetch an 
    //issue.
    if(typeof params.id !== "number" ) notFound()

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
   
    if (!issue)
        notFound()

    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.creatdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailPage