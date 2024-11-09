//10-79-Building the BarChart Component

"use client"

import { Card } from '@radix-ui/themes'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"


interface Props {
    open: number,
    closed: number,
    inProgress: number
}

const IssueChart = ({ open, inProgress, closed }: Props) => {


    const data = [
        { label: "Open", value: open },
        { label: "In progress", value: inProgress },
        { label: "Closed", value: closed }
    ]


    return (
        <Card>
            <ResponsiveContainer width="100%" height={300} >
                <BarChart data={data} >
                    <XAxis dataKey="label" />
                    <YAxis />
                    {/*10-we set barSize for The width or height of each 
                    bar.  */}
                    {/* we set fill prop to change the color here we set 
                    it to a color code 
                    <Bar dataKey="value" barSize={60} fill="#6e56cf" />
                    */}
                    {/* but it would be better if we used the same accent
                     color that is defined in our theme.Look at dev tool
                     Here on the elements tab inside the body element 
                     look we have a div and this is the root of our 
                     theme.(fig 79-2)On this element we have a bunch
                     of custom CSS properties.we use them as a style
                     for fill property.with this if we change our accent
                     color in the future we don't have to come back and
                     change that color code here.
                     */}
                    <Bar dataKey="value" barSize={60} style={{ fill: "var(--accent-9)" }} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueChart