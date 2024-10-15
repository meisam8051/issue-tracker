//4-26-Adding Loading Skeletons


import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from '../../components/IssueStatusBadge'

//2----------
import delay from "delay"

const IssuePage = async () => {

  //2-Now, to see this in action,we install "delay package":
  //->npm i delay
  //and use it to "delay" rendering of our "issues page".
  //Go to issues/loading copy 2.tsx
  await delay(2000)

  const issues = await prisma.issue.findMany()

  return (
    <div>
      <div className='mb-5'>
        <Button><Link href="/issues/new">New Issues</Link></Button>
      </div>
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
              <Table.Cell>{issue.title}
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