//6-45-Handling Errors

"use client"

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter()
    const [error, setError] = useState(false)

    //8-this function has a few lines of code, I would prefer to move it
    //outside, here.
    const deleteIssueHandler = async () => {
        try {
            await axios.delete("/api/issues/" + issueId)
            router.push("/issues")
            router.refresh()
        }
        catch (error) {
            setError(true)
        }
    }

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
                        {/* 8- */}
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