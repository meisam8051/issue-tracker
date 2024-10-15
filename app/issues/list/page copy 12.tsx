//4-30-Building a Styled Link Component
import prisma from '@/prisma/client'
//4-----
import { Table, Link } from '@radix-ui/themes'
//4-----

import React from 'react'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import delay from "delay"
import IssueAction from './IssueActions'

const IssuePage = async () => {
  //3-So a better approach is to use the "Link component" in "RadixUI".
  //(fig 30-3)That gives us this kind of look and feel is very nice 
  //and "the color" is based on "the accent color" of "our theme".So here 
  //we see blue links because blue is the accent color of the theme 
  //used on this page.(fig 30-3)

  //5-With the link component in radix UI, we lose client-side navigation.
  //When I click on this link, we get a full page reload.To sove this we
  //We have to create a custom component that combines both the next link
  //and the radix link.
  //Go to components/link.tsx


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
                {/* 4-we replaced the link component that comes from nextJS
                 with the link that comes with radix UI.So The color that 
                 we have here matches our theme.If we change our theme in
                 the future, the color will get updated */}
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