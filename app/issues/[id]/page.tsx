//4-28-Styling the Issue Detail Page
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        notFound()

    //1-Here we use radix ui component for styling our issue detail page.

    return (
        <div>
            {/* 2-Heading by default is h1 but we can always overwrite
            it with as prop to show other headins tag like h2 and so on. 
            */}
            <Heading>{issue.title}</Heading>
            {/* 3-For using flex to show our status and date horizontally
            we can use a div with class flex or flex component in Radix-UI.
            gap prop gives a space between the children of Flex component.
              */}
            <Flex gap="4" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.creatdAt.toDateString()}</Text>
            </Flex>
            {/*4-all the layout components in Radix UI have props for
                applying paddings and margin.Here we use my prop for
                giving a vertical margin.  */}
            <Card><p>{issue.description}</p></Card>
        </div>
    )
}

export default IssueDetailPage