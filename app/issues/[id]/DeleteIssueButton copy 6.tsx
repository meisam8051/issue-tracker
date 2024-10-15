// 6-46-Improving the User Experience


"use client"

import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter()
    const [error, setError] = useState(false)
    //2-
    const [isDeleting, setIsDeleting] = useState(false)


    const deleteIssueHandler = async () => {
        try {
            //3-
            setIsDeleting(true)
            await axios.delete("/api/issues/" + issueId)
            router.push("/issues")
            router.refresh()
        }
        catch (error) {
            //4-
            setIsDeleting(false)
            setError(true)
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                {/* 5-we use spinner and disabling button here */}
                <Button color='red'
                    disabled={isDeleting}>
                    Delete Issue
                    {isDeleting && <Spinner />}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Confirm Deletion
                </AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue?This action
                    cannot be undone.
                </AlertDialog.Description>
                <Flex mt="4" gap="4">
                    <AlertDialog.Cancel>
                        <Button color='gray' variant='soft'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button onClick={deleteIssueHandler} color='red'>Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>

            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Error
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue could not be deleted.
                    </AlertDialog.Description>
                    <Button mt="3" color='gray' variant='soft'
                        onClick={() => setError(false)} >OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>

        </AlertDialog.Root>
    )
}

export default DeleteIssueButton