//4-33-Refactoring- Organizing Imports

import { Box } from '@radix-ui/themes'
import React from 'react'
//12-
import { Skeleton } from "@/app/components/index"



const LoadingNewIssuePage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton height="20rem" />
        </Box>
    )
}

export default LoadingNewIssuePage

