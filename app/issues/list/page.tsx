import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import IssueAction from './IssueActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery
}


const IssuePage = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ?
    searchParams.status : undefined


  const orderBy = columnNames.includes(searchParams.orderBy) ?
    { [searchParams.orderBy]: "desc" } : undefined

  const where = { status }

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where: where,
    orderBy: orderBy || {creatdAt:'desc'},
    skip: (page - 1) * pageSize,
    take: pageSize


  })

  const issueCount = await prisma.issue.count({ where: where })


  return (
    <Flex direction='column' gap="3">
      <IssueAction />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount} />
    </Flex>
  )
}

export const dynamic = "force-dynamic"
export const metadata:Metadata ={
  title:"Issue Tracker - Issue List",
  description:"View all project issues"
}


export default IssuePage