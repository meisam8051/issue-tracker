import prisma from '@/prisma/client'
import { Box, Grid, Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOption from '@/app/auth/authOption'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'


interface Props {
    params: { id: string }
}

const fetchIssue = cache((IssueId: number) => prisma.issue.findUnique(
    { where: { id: IssueId } }))

const IssueDetailPage = async ({ params }: Props) => {

    const session = await getServerSession(authOption)
    const issue = await fetchIssue(parseInt(params.id))

    if (!issue)
        notFound()


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

export async function generateMetadata({ params }: Props) {
    const issue = await fetchIssue(parseInt(params.id))
    return {
        title: issue?.title,
        description: "Details of issue " + issue?.id
    }
}

export default IssueDetailPage


