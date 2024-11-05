import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import { default as Link, default as NextLink } from 'next/link'

//5-The main purpose of this module is to represent a component.So we move
//columns constant to the above of this file.

//3-Because we use searchParams here and in the list issue page we define
//it here and export it to use it in list issue page to prevent 
//duplication.
export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string
}

//2-we need the issues array as well as search params.So let's 
//define the props interface.
interface Props {
    searchParams: IssueQuery
    issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
    return (
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
    )
}

//4-We also need the const columns here,se we grab this columns from our 
//list issue page and put it here.
const columns: {
    label: string,
    value: keyof Issue,
    className?: string
}[] = [
        { label: "Issue", value: "title" },
        { label: "Status", value: "status", className: 'hidden md:table-cell' },
        { label: "Created", value: "creatdAt", className: 'hidden md:table-cell' }
    ]

//6-I don't want to export this entire columns object to use in the list 
//issue page because here we have details that are relevant to this 
//component only.For example, these class names or labels, they're only
//relevant in this component.So they are implementation detail of this 
//component.We don't want to leak the implementation details here because
//that violates the encapsulation principle.

//We only want to export the properties of the issue model that can 
//be used for sorting.
//Go back to app/issues/list/page copy 23.tsx
export const columnNames = columns.map(column => column.value)

export default IssueTable