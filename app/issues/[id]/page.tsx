//11-81-Adding Metadata


import prisma from '@/prisma/client'
import { Box, Grid, Flex } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOption from '@/app/auth/authOption'
import AssigneeSelect from './AssigneeSelect'

interface Props {
    params: { id: string }
}
const IssueDetailPage = async ({ params }: Props) => {

    const session = await getServerSession(authOption)

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        notFound()


    await delay(2000)


    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5" >
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && <Box>
                <Flex direction="column" gap="4">
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />

                </Flex>
            </Box>}
        </Grid>
    )
}

//3-on this page we want to have dynamic metadata based on the title 
//of the issue.To do that we have to export an async function called
//generateMetadata().Nextjs looks for it so make the spelling like the
//following.
//we need to have access to our route parameters so we fetch the issue
//with the given ID from the database.(fig 81-3 81-4 81-5 81-6 81-7 81-8)
export async function generateMetadata({ params }: Props) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    return {
        title: issue?.title,
        description: "Details of issue " + issue?.id
    }
}

export default IssueDetailPage

