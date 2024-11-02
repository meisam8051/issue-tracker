import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'


//1-our pagination component needs a few props.
interface Props {
    itemCount: number,//For total number of items. 
    pageSize: number,//the number of items to show on each page.
    currentPage: number,
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    //3-we have to compute the total pages based on the item count and 
    //page size.because the result of this division might be a floating
    //point number, here we have to use Math.ceil to properly calculate 
    //the total number of pages.
    const pageCount = Math.ceil(itemCount / pageSize)
    //If we have one or zero page, we want to prevent rendering 
    //pagination.
    if (pageCount <= 1) return null

    return (
        //2-we want to use a flex container because we want to lay out a 
        //bunch of buttons horizontally.
        <Flex align="center" gap="2">
            <Text size="2">
                page {currentPage} of {pageCount}
            </Text>
            {/* 4-We need buttons for going to previous and next pages.
            this button is for going to the first page */}
            <Button color='gray'
                //we want to disable this button if we are on the first page.
                variant='soft' disabled={currentPage === 1}>
                <DoubleArrowLeftIcon />
            </Button>
            {/* This button is for going to the previous page */}
            <Button color='gray' variant='soft' disabled={currentPage === 1}>
                <ChevronLeftIcon />
            </Button>
            {/* this button is for going to the next page */}
            <Button color='gray'
            //we should disable this button if we are on the last page.
                variant='soft' disabled={currentPage === pageCount}>
                <ChevronRightIcon />
            </Button>
            {/* this button is for going to the last page */}
            <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination