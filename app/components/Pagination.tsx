// 9-74-Implementing Pagination

//4-Because we use hooks and onClick event,we have to change this 
//component,client component.
"use client"
//Go to app/page copy 4.tsx

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'



interface Props {
    itemCount: number,
    pageSize: number,
    currentPage: number,
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {

    //1-
    const router = useRouter();//For updating the current URL.
    const searchParams = useSearchParams();//To access current query 
    //parameters.Because as part of passing the current page to the URL, 
    //we don't want to clear the existing parameters.

    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null

    //2-Now let's define a function for updating the current page.
    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())
        //Here we are only updating the query string, not the endpoint.
        router.push(`?${params}`)
    }


    return (
        <Flex align="center" gap="2">
            <Text size="2">
                page {currentPage} of {pageCount}
            </Text>
            <Button color='gray' variant='soft'
                disabled={currentPage === 1}
                // 3-
                onClick={() => changePage(1)}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color='gray' variant='soft'
                disabled={currentPage === 1}
                //3-
                onClick={() => changePage(currentPage - 1)}>
                <ChevronLeftIcon />
            </Button>
            <Button color='gray' variant='soft'
                disabled={currentPage === pageCount}
                //3-
                onClick={() => changePage(currentPage + 1)}>
                <ChevronRightIcon />
            </Button>
            <Button color='gray' variant='soft'
                disabled={currentPage === pageCount}
                //3-
                onClick={() => changePage(pageCount)}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination