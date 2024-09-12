//4-27-Showing Issue Details
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from "delay"
import IssueAction from './IssueActions'

const IssuePage = async () => {

  await delay(2000)

  const issues = await prisma.issue.findMany()

  return (
    <div>
      <IssueAction />
      <Table.Root variant='surface' >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) =>
            <Table.Row key={issue.id}>
              <Table.Cell>
                {/* 5-Now here we should add link to our IssueDetailPage
                  */}
                <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.creatdAt.toDateString()}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

//6-Because we added a loading page in our issues folder and this loading
//file will be used for any route that starts with issues,we see that is
//rendered for all our route that starts with issues.
//Now to fix that we have to add separate loading files for the other 
//segments of this route.
//Go to issues/[id]/loading.tsx


export default IssuePage