//5-39-Understanding Caching
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import React from 'react'
import { Link, IssueStatusBadge } from "@/app/components"
import delay from "delay"
import IssueAction from './IssueActions'


const IssuePage = async () => {


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

//1-For rendering our issue page,dynamically,here we export a constant
//called 'dynamic' and set it to "force-dynamic",then rebuild our 
//application.(fig 39-7)
//Now if users create a new issue they can't see that in issues page but 
//with a refresh they can see it.(fig 39-8 39-9)That is because of a 
//diffrent kind of cache, named "client cache".  
export const dynamic = "force-dynamic" 

//2-Another option to export is the "revalidate option".If we set this to
//"zero", this is exactly the same as setting "dynamic" to "force dynamic".
//So we are telling next JS that the output of this page has to be 
//revalidated every zero seconds, meaning all the time.With this we can
//give it a time for rerendering issues page.
// export const revalidate = 0;
//Go back to 5-39-Understanding Caching


export default IssuePage