//9-70-Sorting Issues
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import React from 'react'
import { Link, IssueStatusBadge } from "@/app/components"
import delay from "delay"
import IssueAction from './IssueActions'
import { Issue, Status } from '@prisma/client'
import NextLink from "next/link"
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue
  }
}


const IssuePage = async ({ searchParams }: Props) => {

  const columns: {
    label: string,
    value: keyof Issue,
    className?: string
  }[] = [
      { label: "Issue", value: "title" },
      { label: "Status", value: "status", className: 'hidden md:table-cell' },
      { label: "Created", value: "creatdAt", className: 'hidden md:table-cell' }
    ]



  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ?
    searchParams.status : undefined

    //4-For preventing to set invalid value to orderBy query parameter 
    //manually,we validate our searchParams.
    const validateOrderBy =columns.map(column=>column.value)

    //3-So, to solve this, we have to properly create this object before 
    //passing it to Prisma.The same way we computed the status.
  const orderBy =validateOrderBy.includes(searchParams.orderBy) ?
    { [searchParams.orderBy]: "asc" } : undefined

  const issues = await prisma.issue.findMany({
    where: {
      status
    },
    orderBy: orderBy
  })



  return (
    <div>
      <IssueAction />
      <Table.Root variant='surface' >
        <Table.Header>
          <Table.Row>
            {columns.map(column =>
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value }
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy
                  && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>
            )}

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