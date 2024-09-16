//4-31-Additional Loading Skeletons

import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

//7-Here we also created a separate loading skeleton for the new Issue 
//page.

const LoadingNewIssuePage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton height="20rem" />
        </Box>
    )
}

export default LoadingNewIssuePage

