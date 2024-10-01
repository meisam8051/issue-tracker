//5-41-Adding a Delete Button
import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
//6-(fig 41-2)we have some space in "view issue page" between "the issue 
//details" and "the buttons".That is because of "the prose class" applied
//to this Card component here.(fig 41-3)If we inspect, we see that the 
//first four columns are allocated to our "issue details" but the prose 
//class "applies a max width" to this "Card component".

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="4" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.creatdAt.toDateString()}</Text>
            </Flex>
            {/*7-the "prose class" applies a "max width" to this card 
            component.It also limits the number of characters to "65 
            characters per line".And this is to improve the "readability 
            of our text". */}
            {/*8-we want to apply "a max width of full" to allow the card 
            to stretch and take the available space while keeping the 
            number of characters on each line to 65 characters.
            (fig 41-4)*/}
            <Card className='prose max-w-full' mt="4"><ReactMarkdown>{issue.description}</ReactMarkdown></Card>
        </>
    )
}
//Go to issues/[id]/page copy 11.tsx

export default IssueDetails