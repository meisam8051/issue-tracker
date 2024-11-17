import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
    open: number,
    closed: number,
    inProgress: number
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {


    const contatiners: { label: string, value: number, status: Status }[]
        = [
            {
                label: "Open Issues",
                value: open,
                status: 'OPEN'
            },
            {
                label: "Closed Issues",
                value: closed,
                status: 'CLOSED'
            },
            {
                label: "In-progress Issues",
                value: inProgress,
                status: 'In_PROGRESS'
            }
        ]


    return (
        <Flex gap="4">
            {contatiners.map(contatiner => {
                return (
                    <Card key={contatiner.label}>
                        <Flex direction="column" gap="1">
                            <Link
                                className='font-medium text-sm'
                                href={`/issues/list?status=${contatiner.status}`}>
                                {contatiner.label}
                            </Link>
                            <Text
                                size="5"
                                className='font-bold'
                            >
                                {contatiner.value}
                            </Text>
                        </Flex>
                    </Card>
                )
            })}
        </Flex>
    )
}

export default IssueSummary