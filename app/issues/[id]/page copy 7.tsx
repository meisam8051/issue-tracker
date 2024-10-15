//5-34-Adding the Edit Button
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Grid, Heading, Text,Box, Button } from '@radix-ui/themes'
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


    await delay(2000)

    return (
        //1-First we have to replace "the div" with "the Grid component" 
        //of Radix UI.
        <Grid columns={"2"}  >
            {/* 2-here we need to have two children, one for each column.So
            we set columns prop to two.
            GO to issues/[id]/page copy 8.tsx*/}
            <Box className='mb-4'>
                <Heading>{issue.title}</Heading>
                <Flex gap="4" my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.creatdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' mt="4"><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
            </Box>
            <Box>
                <Button>Edit Issue</Button>
            </Box>
        </Grid>
    )
}


export default IssueDetailPage