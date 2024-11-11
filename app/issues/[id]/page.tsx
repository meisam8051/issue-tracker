//11-82-Optimizing Performance Using React Cache


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
import { cache } from 'react'

//1-there are two places where we are fetching the same issue here.Once 
//as part of rendering this page and also once as part of generating our
//metadata.
//So this is where we can use the cache function in React to reduce the 
//extra load on our database.


interface Props {
    params: { id: string }
}

//2-we call ache function from react.It gives a callback function.This
//should be a function with expensive computation.

//In this case we don't really need to await this call because we are 
//returning the promise straight away.If we had more code after await 
//and then we had a return statement it would make sense to await this 
//call.

const fetchIssue = cache((IssueId: number) => prisma.issue.findUnique(
    { where: { id: IssueId } }))

const IssueDetailPage = async ({ params }: Props) => {

    const session = await getServerSession(authOption)

    //3-
    const issue = await fetchIssue(parseInt(params.id))

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

export async function generateMetadata({ params }: Props) {
    //4-
    const issue = await fetchIssue(parseInt(params.id))
    return {
        title: issue?.title,
        description: "Details of issue " + issue?.id
    }
}

//5-to prove that here we are only querying the database once, 
//we can turn on login in our Prisma client.
//Go to prisma/client copy 2.tsx

export default IssueDetailPage


//7-If we refresh our issue detail page and look at the console, There 
//are two queries to the database.One for selecting an issue.The other 
//query is for selecting a user.The other query is for selecting a user.
//fig(82-2) 
