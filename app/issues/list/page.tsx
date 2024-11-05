//9-76-Refactoring
import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import IssueAction from './IssueActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'

interface Props {
  searchParams: IssueQuery
}


const IssuePage = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status) ?
    searchParams.status : undefined


  const orderBy = columnNames.includes(searchParams.orderBy) ?
    { [searchParams.orderBy]: "asc" } : undefined

  const where = { status }

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where: where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize


  })

  const issueCount = await prisma.issue.count({ where: where })


  return (
    //9-For fixing the layout issue we use Flex component
    //Go to app/issues/list/IssueActions copy 3.tsx
    <Flex direction='column' gap="3">
      <IssueAction />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount} />
    </Flex>
  )
}

export const dynamic = "force-dynamic"



export default IssuePage