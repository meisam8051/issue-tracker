//6-42-Adding a Confirmation Dialog Box

//2-We should change this component to a client component because we get
//this error:Cannot access AlertDialog.Root on the server. You cannot 
//dot into a client module from a server component. You can only pass 
//the imported name through.(fig 42-2)
//here we need interaction with the user.
"use client"

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        //1-----------------------------
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
                        {/*3-this button also has a prop called variant 
                        so we have various flavors of these components.
                        We can set this to soft and now our button looks
                        softer.*/}
                        <Button color='gray' variant='soft'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red'>Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>

        </AlertDialog.Root>
        // --------------------------------------
    )
}

export default DeleteIssueButton