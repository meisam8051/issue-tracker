//4-29-Adding Markdown Preview
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
//1---------------
import ReactMarkdown from "react-markdown"

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        notFound()

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="4" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.creatdAt.toDateString()}</Text>
            </Flex>
            {/* 2-Replace p with ReactMarkdown */}
            <Card><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
        </div>
    )
}
//3-We can see our bold and italic text, but what about the heading and 
//these bullet points?(fig 29-3)Look at how these items are rendered.
//(fig 29-4) The bold is rendered using the strong tag, italic is 
//rendered using the em tag, heading is rendered using an h1 tag, and 
//here we have our list items.Now "when using tailwind, our heading and 
//list items are unstyled by default".

//4-To solve this problem, we have to install "a plugin for tailwind" 
//called "topography".So search for "tailwind topography" and in 
//"tailwindcss.com", there are three steps we have to follow.(fig 29-5)
//First we install : ->npm install -D @tailwindcss/typography
//Second step is to import this plugin in the tailwind configuration 
//file, "tailwind.config.ts" .

//Go to tailwind.config.ts

export default IssueDetailPage