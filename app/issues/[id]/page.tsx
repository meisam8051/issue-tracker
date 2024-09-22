//5-35- Applying the Single Responsibility Principle
import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props {
    params: { id: string }
}
//1-our pages should have a single responsibility and that is the 
//two-column grid layout.So everything else that is not about layout 
//should not be part of this page.
//Go to ./EditIssueButton.tsx
const IssueDetailPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        notFound()


    await delay(2000)

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5" >
            <Box>
                {/* 5- */}
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                {/* 6- */}
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    )
}


export default IssueDetailPage