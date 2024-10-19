//7-57-Securing the Application
import prisma from '@/prisma/client'
import { Box, Grid, Flex } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOption from '@/app/auth/authOption'

interface Props {
    params: { id: string }
}
const IssueDetailPage = async ({ params }: Props) => {
    //4-We don't have a separate page for deleting issues, so to secure 
    //our application, we should hide delete and also edit button from 
    //anonymous users.

    //5-we call get server session to get the current user session.And for
    //argument we have to pass the object that we use for initializing 
    //next auth.
    //Go to api/auth/[...nextauth]/route copy 4.tsx
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
            {/* 8-here we use session to render our buttons if it 
            exists(fig 57-1)
             Go to api/issues/route copy 5.ts
            */}
            {session && <Box>
                <Flex direction="column" gap="4">
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid>
    )
}

export default IssueDetailPage