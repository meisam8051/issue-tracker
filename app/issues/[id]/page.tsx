//5-41-Adding a Delete Button
import prisma from '@/prisma/client'
import { Box, Grid, Flex } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

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
    //10-(fig 41-8)on tablets, our buttons are way too wide.So we apply 
    //a two column layout on tablets as well.For that we have to change 
    //our break points.We want to apply five columns to small devices, 
    //that is tablets in RadixUI.And apply col-span-4 to medium devices 
    //in Tailwind.

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5" >
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}
//11-with the current implementation as the screen gets wider, so does 
//our page.This is not ideal for this kind of application.For this kind
//of application, it would be better to have all the content in the center
//of the screen.
//And to do that, we use "the container component" in "Redix UI".So the 
//container component applies a max width to our page and puts the 
//content in the center.
//Go to app/layout copy 6.tsx
export default IssueDetailPage