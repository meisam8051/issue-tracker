//6-44-Deleting an Issue

"use client"

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    //1------------------
    const router = useRouter()

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>Delete Issue</Button>
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
                        {/* 1-------- */}
                        <Button onClick={async () => {
                            await axios.delete("/api/issues/" + issueId)
                            router.push("/issues")
                            router.refresh()
                        }} color='red'>Delete Issue</Button>
                        {/* ----------------- */}
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>

        </AlertDialog.Root>
        // --------------------------------------
    )
}

export default DeleteIssueButton