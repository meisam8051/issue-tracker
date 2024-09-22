//5-34-Adding the Edit Button
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Grid, Heading, Text, Box, Button } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from "react-markdown"
import delay from 'delay'
//4-Next we import it 
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from 'next/link'

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
        //3-In mobile devices we want to have a single column.On the 
        //documentation of Radix UI,in sidebar on Theme, go to Breakponts
        //and there we can use brekpoints to have various styles in 
        //every type of devices.So when setting "the columns prop",instead
        //of passing "a string", we can pass an object.we set "initial
        //breakpoints" to one so that represents one column in small 
        //mobile devices and "md breakpoints" to 2 which represents 
        //two columns for laptops.(fig 34-1 34-2 34-3)

        <Grid columns={{ initial: "1", md: "2" }} gap="5" >
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex gap="4" my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.creatdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' mt="4"><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
            </Box>
            <Box>
                <Button>
                    {/* 5-And use it here */}
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit` }>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    )
    //4-For adding an icon to this button,we go to the radixUI,then in
    //icon page.First we install the icon package:
    //npm install @radix-ui/react-icons
    //then search for pencil icon.(fig 34-4)
}


export default IssueDetailPage