//9-69-Making Columns Sortable
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
    //6-We should also add the orderBy query parameter here.
    orderBy: keyof Issue
  }
}


const IssuePage = async ({ searchParams }: Props) => {


  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ?
    searchParams.status : undefined

  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  })

  const columns: {
    label: string,
    value: keyof Issue,
    className?: string
  }[] = [
      { label: "Issue", value: "title" },
      { label: "Status", value: "status", className: 'hidden md:table-cell' },
      { label: "Created", value: "creatdAt", className: 'hidden md:table-cell' }
    ]


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
                {/* 5-To solve this problem, instead of sending href to a
                 string, we should set it to an object. */}
                <NextLink
                  href={{
                    //In this object, we set the query parameter to an 
                    //object.But here first we spread our search params
                    // to copy all the existing parameters and then we 
                    //can override the orderBy parameter
                    query: { ...searchParams, orderBy: column.value }
                  }}
                >
                  {column.label}
                </NextLink>
                {/* 6-To give user the visual feedback, we should add 
                  an icon. */}
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