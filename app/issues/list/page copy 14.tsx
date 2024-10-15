//4-33-Refactoring- Organizing Imports
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import React from 'react'

import IssueStatusBadge from '../../components/IssueStatusBadge'
import Link from '../../components/Link'

import delay from "delay"
import IssueAction from './IssueActions'

//1-now in this file, we are importing "two custom components" from our 
//"components folder".One is "the IssueStatusBadge".The other is the "Link
//component".We can combine these two statements into a single one.
//Go to app/components/index copy.ts

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

                <Link
                  href={`issues/${issue.id}`}
                >{issue.title}
                </Link>
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