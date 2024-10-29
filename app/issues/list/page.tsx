//9-68-Filtering Issues
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import React from 'react'
import { Link, IssueStatusBadge } from "@/app/components"
import delay from "delay"
import IssueAction from './IssueActions'
import { Status } from '@prisma/client'

//3-to filter issues by their status, we should pass the status as a 
//query parameter to this component or to this page.

//4-
interface Props {
  searchParams: {
    status: Status
  }
}


const IssuePage = async ({ searchParams }: Props) => {

  // console.log(searchParams.status)
  await delay(2000)

  //5-If a user send an invalid status in the URL.We get an error.For solving
  //we need to validate the status before passing it to Prisma.

  const statuses = Object.values(Status)
  //6-console.log(statuses)//When we get the values of type Status we get 
  //an array of our statuses (fig 68-1)

  //7-Now to validate the status, we have to check to see if the status 
  //that is passed is one of the valid values in this array.
  const status = statuses.includes(searchParams.status) ?
    searchParams.status : undefined
  //8-If you pass undefined to Prisma, Prisma will not include that 
  //status as part of filtering.

//9-
  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  })

  //10-So if we pass a wrong status quary parameter, we get all the 
  //issues(fig 68-2)

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
                  href={`/issues/${issue.id}`}
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

export const dynamic = "force-dynamic"



export default IssuePage