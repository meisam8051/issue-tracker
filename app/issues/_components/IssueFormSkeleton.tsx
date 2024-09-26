//5-40- Improving the Loading Experience
import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components/index'

const IssueFormSkeleton = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton height="2rem" />
            <Skeleton height="20rem" />
        </Box>
    )
}

//Go to issues/new/loading copy 5.tsx 

export default IssueFormSkeleton