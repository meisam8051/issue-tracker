//10-77-Building the LatestIssues Component


import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { IssueStatusBadge } from './components'



const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        //1-to get the latest issues first we have to sort them by their 
        //creation date in desending order.
        orderBy: {
            creatdAt: "desc"
        },
        take: 5,//Here we take the top 5 records

        //3-Now if an issue is assigned to a user, I want to show the 
        //avatar of the user.as part of fetching these issues, we want 
        //to fetch the users they're assigned to.This technique is called
        // eager loading.
        include: {
            assignedToUser: true
        }
    })

    return (
        <Card>
            <Heading size="4" mb="5">
                Latest Issues
            </Heading>
            {/* 2-we're going to render these issues inside a table.(fig 77-1) */}
            <Table.Root>
                <Table.Body>
                    {issues.map(issue =>
                        <Table.Row key={issue.id}>
                            <Table.Cell >
                                <Flex justify="between">
                                    {/*2-the reason our batch is stretched
                                     is because in flex containers with 
                                     the direction of column by default, 
                                     a line is set to stretch.To fix this we have to set
                                     align prop to start (fig 77-2) (fig 77-3) */}
                                    <Flex direction="column" align="start" gap="2">
                                        <Link href={`/issues/${issue.id}`}>
                                            {issue.title}
                                        </Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {/* 3-Here we can also check if 
                                    assigned to user is truthy.So once we
                                    include this property, it will be 
                                    included in our issue objects. */}
                                    {issue.assignedToUser &&
                                        <Avatar src={issue.assignedToUser?.image!}
                                            fallback="?"
                                            size="2"
                                            radius='full' />
                                    }
                                </Flex>
                            </Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root >
        </Card>
    )
}

export default LatestIssues;