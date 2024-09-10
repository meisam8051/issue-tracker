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
              {/* 5-Now on mobile I also want to add the status below the
               title.(fig 24-5) */}
              <Table.Cell>{issue.title}
                <div className='block md:hidden'>{issue.status}</div>
              </Table.Cell>
        
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