//4-30-Building a Styled Link Component
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from '../../components/IssueStatusBadge'
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
                {/* 1-One option is to give this link a couple of tailwind
                 classes.It is better, but this approach is not ideal 
                 because every time we have a link, we have to remember 
                 to use these two classes.(fig 30-2)
                 Go to issues/page copy 11.tsx */}
                <Link
                  href={`issues/${issue.id}`}
                  className='text-violet-600 hover:underline'>{issue.title}</Link>
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

export default IssuePage