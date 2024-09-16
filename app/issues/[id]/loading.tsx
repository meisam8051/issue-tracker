//4-31-Additional Loading Skeletons

import { Flex, Card, Box } from '@radix-ui/themes';
import React from 'react'


//3-we import the skeleton component and the corresponding CSS file.
//we can find them on github or in npmjs.com in react-skeleton-loading 
//page. 
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

//1-We go to the issue detail page and grab all the mark up of it and 
//paste it here

const LoadingIssueDetailPage = () => {
    return (
        //2-we can replace this div with a box component from Radix UI 
        //for consistency.This also renders a div.we give the Box 
        //component a max with for preventing the skeleton that is for 
        //Heading gives all the with of our page.
        <Box className='max-w-xl'>
            <Skeleton />
            <Flex gap="4" my="2">
                {/* 4-by default, skeletons span and take all the 
                available space, but ourbadges are small.So, to create 
                a skeleton that has the same look and feel as our badges,
                I'm going to give this a custom width. */}
                <Skeleton width="5rem" />
                <Skeleton width="8rem" />
            </Flex>
            {/* 5-we want to repeat this three times to simulate that we 
            have multiple lines of text, so we can set count to 3. */}
            <Card className='prose' mt="4"><Skeleton count={3} /></Card>
        </Box>
    )
}

// Go to issues/[id]/page copy 6.tsx

export default LoadingIssueDetailPage;

