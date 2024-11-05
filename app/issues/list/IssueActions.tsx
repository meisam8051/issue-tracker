// 9-76-Refactoring
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'



const IssueActions = () => {
    //10-earlier we applied the bottom margin here, but this is not a 
    //good solution because we should be able to put this component 
    //anywhere on any page without worrying that it would mess up 
    //with the layout of that page.So let's remove bottom margin 
    //and rely on the gap of the flex container to determine the padding.
    // (fig 76-1 76-2)
    return (
        <Flex justify="between">
            <IssueStatusFilter />
            <Button><Link href="/issues/new">New Issues</Link></Button>
        </Flex>
    )
}

export default IssueActions