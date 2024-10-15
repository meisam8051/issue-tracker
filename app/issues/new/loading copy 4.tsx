//5-40- Improving the Loading Experience

import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from "@/app/components/index"

//7-We're going to grab this code and move it into a "reusable component" 
//because we're going to use it in "multiple places".
//Go to issues/_components/IssueFormSkeleton.tsx

const LoadingNewIssuePage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton height="20rem" />
        </Box>
    )
}

export default LoadingNewIssuePage

