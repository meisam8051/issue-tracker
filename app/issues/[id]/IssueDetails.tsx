//5-35- Applying the Single Responsibility Principle
import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

//4-Now here we need to know the issue to render.If this is the only 
//place where we need this issue, it makes more sense to fetch the issue
//here,but we need it in our editIssueButton.tsx and maybe other future
//compoents in our detail page.So we use prop solution for geeting it 
//from our detail page.  
//Go back to ./page copy 9.tsx
const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="4" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.creatdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt="4"><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
        </>
    )
}

export default IssueDetails