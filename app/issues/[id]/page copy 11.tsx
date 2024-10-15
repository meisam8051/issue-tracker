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
    //9-So on mobile,our buttons haven't stretched to take all the 
    //available space (fig 41-5 41-6).The "issue details component" is 
    //taking all these "five columns", but "our buttons" are taking only a 
    //"single column".We should apply "col-span-4" only on large devices, 
    //not on mobile devices.
    //"md" in "Redix UI" represents "laptops", and that is equivalent to 
    //"lg" or large in "Tailwind".(fig 41-7)


    return (
        <Grid columns={{ initial: "1", md: "5" }} gap="5" >
            <Box className='lg:col-span-4'>
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


export default IssueDetailPage