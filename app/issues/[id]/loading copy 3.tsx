//4-33-Refactoring- Organizing Imports

import { Flex, Card, Box } from '@radix-ui/themes';
import React from 'react'


//7- every time we want to use our skeleton, we have to import the 
//"skeleton component" and "it's CSS file".We can combine these two 
//inside a "separate module".
//Go to components/Skeleton.tsx 

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


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

