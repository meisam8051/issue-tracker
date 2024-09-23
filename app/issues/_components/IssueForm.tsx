//5-36-Building the Edit Issue Page
"use client"

import { ErrorMessage, Spinner } from '@/app/components';
import { createdIssuesSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Callout, TextField, Button } from '@radix-ui/themes';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import "easymde/dist/easymde.min.css";
import { Issue } from '@prisma/client';

//2-Beause we're going to use that only in the issue section of our 
//website.So here in the issues folder we create a components folder 
//and add our IssueForm.tsx .


const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
)

//3-We changed the name of our type because It was the same as our 
//component's name. 
type IssueFormData = z.infer<typeof createdIssuesSchema>

//8- we should make this optional because it's only needed on the edit 
//page.
interface Props {
    issue?: Issue
}

const IssueForm = ({ issue }: Props) => {

    const router = useRouter()

    const [error, setError] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, control, handleSubmit, formState: { errors } } =
        useForm<IssueFormData>({
            resolver: zodResolver(createdIssuesSchema)
        })

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            await axios.post("/api/issues", data)
            router.push("/issues")
        } catch (error) {
            setIsSubmitting(false)
            setError("Unexpected error has occurred!")
        }

    })

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color='red' className='mb-3'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className=' space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    {/* 9-we set defaultValue */}
                    <TextField.Input defaultValue={issue?.title} placeholder='title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    {/* 9-we set defaultValue */}
                    defaultValue={issue?.description}
                    render={({ field }) => {
                        const { ref, ...rest } = field;
                        return <SimpleMDE placeholder='Description'  {...rest} />
                    }}

                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Submit New Issue {isSubmitting
                    && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm

//4-we can optionally rename the component and prefix it with an
//underscore ==>_components
//And with this, we can opt this folder out of the routing system.So it's
//not going to be part of our routing system, even if you put a page file
//here.This is a good technique for separating implementation details
//from our routing folders.(fig 36-1)

//Go to issues/new/page copy 18.tsx

