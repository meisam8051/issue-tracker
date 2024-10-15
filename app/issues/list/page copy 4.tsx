// 4-24-Showing the Issues

import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuePage = async () => {

  const issues = await prisma.issue.findMany()

  return (
    <div>
      <div className='mb-5'>
        <Button><Link href="/issues/new">New Issues</Link></Button>
      </div>
      {/* 3-If we set "varient" proprty to "surface" we get this nice gray
      //heading and rounded corners here.  */}
      <Table.Root variant='surface' >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            {/*4---------------- */}
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) =>
            <Table.Row key={issue.id}>
              <Table.Cell>{issue.title}</Table.Cell>
              {/*4-on mobile devices the table looks a little bit squashed.
              (fig 24-2) So on mobile I want to hide these two columns 
              "status" and "created".(fig 24-3)(fig 24-4)
              Go to app/issues/page copy 5.tsx*/}
              <Table.Cell className='hidden md:table-cell'>{issue.status}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.creatdAt.toDateString()}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  )
}



export default IssuePage