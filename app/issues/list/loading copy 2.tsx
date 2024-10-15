//4-26-Adding Loading Skeletons
import { Table } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBadge from '../../components/IssueStatusBadge'
//3---------------------
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

//3-Now we're going to replace that "loading message" with "modern 
//skeletons".First we install this package:
//npm i react-loading-skeleton@3.3.1
//Then on react-loading-skeleton documantaion we have to import the 
//skeleton component from this package as well as the corresponding
//CSS file here.(fig 26-1)

//4-we copy our table on issues page here.Now we have to do a few 
//changes in it.In the body of our table, here we don't have access
//to our Issues because we haven't fetched them from the database yet.
//So to simulate a few issues, here we declare an array called Issues
//and set it to an array.

const loadingIssuePage = () => {
    //5-This is just to render five rows of skeletons.
    const issues = [1, 2, 3, 4, 5]
    return (
        <Table.Root variant='surface' >
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map((issue) =>
                    //6-when setting the key, instead of using issue.id, we 
                    //use the issue.
                    <Table.Row key={issue}>
                        <Table.Cell>
                            {/* 7-Instead of showing data here 
                            we're going to render a Skeleton component.*/}
                            <Skeleton />
                            <div className='block md:hidden'>
                                <Skeleton />
                            </div>
                            {/* 7------ */}
                        </Table.Cell>

                        <Table.Cell className='hidden md:table-cell'>
                            {/* 7------ */}
                            <Skeleton />
                        </Table.Cell>
                        <Table.Cell
                            className='hidden md:table-cell'>
                            {/* 7------ */}
                            <Skeleton />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    )
}
//8-The only problem is that while we're showing the skeleton, we don't 
//see the new Issue button.So our table kind of jumps down.To solve this
//problem, we should add this button to our loading component as well.But
//In the future, we're going to add a dropdown list for filtering issues.
//So we don't want to duplicate everything into different files.
//So a better approach is to extract these parts from our issues page, 
//and put them in a reusable component,and use it in our issues page as 
//well as our loading page.

//Go to issue/issueActions.tsx 

export default loadingIssuePage