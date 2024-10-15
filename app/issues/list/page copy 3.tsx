// 4-24-Showing the Issues

import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuePage = async () => {

  //1-First we're going to use "Prisma" to fetch all the issues from our 
  //"database".
  const issues = await prisma.issue.findMany()

  return (
    <div>
      <Button><Link href="/issues/new">New Issues</Link></Button>
      {/*2-Then here we use the Table component of RadixUI(fig 24-1) 
      Go to app/issues/page copy 4.tsx*/}
      <Table.Root >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) =>
            <Table.Row key={issue.id}>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>{issue.status}</Table.Cell>
              <Table.Cell>{issue.creatdAt.toDateString()}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  )
}



export default IssuePage