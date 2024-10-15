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

    //4-our buttons are taking so much space because by default, each 
    //column of our Grid takes half of the available space(fig 41-1).Now
    //to improve the layout, let's allocate 80% of the space to the "issue 
    //detail" and 20% to "the buttons".
    return (
        //5-we can change the number of columns in our grid from two to 
        //five
        <Grid columns={{ initial: "1", md: "5" }} gap="5" >
            {/* 5-allocate four columns to this "issue details box".
            Go to isues/[id]/IssueDetails copy 2.tsx*/}
            <Box className='col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                {/* 3-Our buttons are laid out "horizontally" because 
                buttons are "inline elements" in "HTML".to lay them out 
                vertically, we have to put these inside a "flex container"
                 */}
                <Flex direction="column" gap="4">
                    <EditIssueButton issueId={issue.id} />
                    {/* 2- */}
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}


export default IssueDetailPage