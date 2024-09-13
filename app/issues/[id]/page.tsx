//4-29-Adding Marhdown Preview
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import ReactMarkdown from "react-markdown"

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        notFound()

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="4" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.creatdAt.toDateString()}</Text>
            </Flex>
         {/* 5-Third we have to add the prose class to the containing 
         element. */}
            <Card className='prose' mt="4"><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
        </div>
    )
}


export default IssueDetailPage