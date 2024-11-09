// 10-78-Building the IssueSummary Component

import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

//4-------
interface Props {
    open: number,
    closed: number,
    inProgress: number
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {

    //1-Now in this component, we want to layout three cards horizontally.
    //Each card should contain the number of issues for a given status.

    //2-For preventing to repeat these three card components we define an
    //object for them then map it.

    const contatiners: { label: string, value: number, status: Status }[]
        = [
            //3-value property is for the numbers of issues that have the
            //specified status.we need to pass that value using props to 
            //this component.
            {
                label: "Open Issues",
                value: open,
                status: 'OPEN'
            },
            //5-We use the status property to send the user to the issue 
            //list page with the filter that is the value of status 
            //property.
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
            {/* 6- */}
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