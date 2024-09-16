//4-31-Additional Loading Skeletons
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

import ReactMarkdown from "react-markdown"
import delay from 'delay'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        notFound()

    //6-Now, to see this in action, here we apply a delay.
    //Go to issues/new/loading.tsx
    await delay (2000)

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="4" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.creatdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt="4"><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
        </div>
    )
}


export default IssueDetailPage