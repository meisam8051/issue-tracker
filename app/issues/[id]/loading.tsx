//4-33-Refactoring- Organizing Imports

import { Flex, Card, Box } from '@radix-ui/themes';
import React from 'react'


 //8-
import {Skeleton} from "@/app/components"
//we have to apply the same refactoring to our other loading files.


const LoadingIssueDetailPage = () => {
    return (

        <Box className='max-w-xl'>
            <Skeleton />
            <Flex gap="4" my="2">
    
                <Skeleton width="5rem" />
                <Skeleton width="8rem" />
            </Flex>

            <Card className='prose' mt="4"><Skeleton count={3} /></Card>
        </Box>
    )
}



export default LoadingIssueDetailPage;

