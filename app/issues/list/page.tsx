//9-75-PaginatingIssues
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import React from 'react'
import { Link, IssueStatusBadge } from "@/app/components"
import delay from "delay"
import IssueAction from './IssueActions'
import { Issue, Status } from '@prisma/client'
import NextLink from "next/link"
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'

interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue,
    //1-we should also get page query parameter which is for showing 
    //that which page we are.
    page: string
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

  const validateOrderByValues = columns.map(column => column.value)

  const orderBy = validateOrderByValues.includes(searchParams.orderBy) ?
    { [searchParams.orderBy]: "asc" } : undefined

    //forcleaner code we extract this repetitive code.
  const where = { status }

//2-as part of fetching the issues, we need to fetch the issues for
//a given page.
  const page = parseInt(searchParams.page) || 1 //if we cannot parse this 
  //to a valid number or if the page parameter is not provided,we give 
  //this a default value of 1.
  const pageSize = 10//In the future, you can extend this application and 
  //add a drop-down list for selecting the page size.

  const issues = await prisma.issue.findMany({
    where: where,
    orderBy: orderBy,
    //3-while fetching issues, here we should add two extra properties.
    skip: (page - 1) * pageSize,//that is the number of records we should
    //skip.For example if the page = 2(we are in page 2),10 records of
    //our issues are skipped.
    take: pageSize //this is the number of records we want to fetch for
    //showing our specified page.

  })

  //4-we also need to know the total number of issues so we can pass it 
  //to our pagination component.
  const issueCount =await prisma.issue.count({ where: where })


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
      {/* 5- */}
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount} />
    </div>
  )
}

export const dynamic = "force-dynamic"



export default IssuePage