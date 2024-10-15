//6-45-Handling Errors

"use client"

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter()
    //2-
    const [error, setError] = useState(false)

    return (
        <>        <AlertDialog.Root>
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
                        <Button onClick={async () => {
                            //1-what if something goes wrong when we 
                            //delete a button by calling the backend?We 
                            //should use "try catch block" for "handeling 
                            //errors".
                            try {
                                //6-to simulate an error, we can throw an
                                //error here.
                                //throw new Error()
                                await axios.delete("/api/issues/" + issueId)
                                router.push("/issues")
                                router.refresh()
                            }
                            catch (error) {
                                //3-
                                setError(true)
                            }
                        }} color='red'>Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
            {/* 4-Then we create a "error box" by "alert dialog component" 
            from RadixUI without it's "Trigger component "   */}
            {/* 5-we wanna show this error box if we have error.this
             "Root component" has a prop called "open".if it's true this
             "error box" is shown if not it is not shown.We set it to
             our "error state"*/}
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Error
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue could not be deleted.
                    </AlertDialog.Description>
                    {/* 7-For removig the "error box" we should set error
                    to false for "ok button" of our error box. */}
                    <Button mt="3" color='gray' variant='soft'
                        onClick={() => setError(false)} >OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}
// Go to DeleteIssueButton Copy 5.tsx

export default DeleteIssueButton