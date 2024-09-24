//5-39-Understanding Caching
"use client"

import { ErrorMessage, Spinner } from '@/app/components';
import { IssuesSchema } from '@/app/validationSchemas';
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



const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
)

type IssueFormData = z.infer<typeof IssuesSchema>


interface Props {
    issue?: Issue
}

const IssueForm = ({ issue }: Props) => {

    const router = useRouter()

    const [error, setError] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, control, handleSubmit, formState: { errors } } =
        useForm<IssueFormData>({
            resolver: zodResolver(IssuesSchema)
        })

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            if (issue)
                await axios.patch("/api/issues/" + issue.id, data)
            else
                await axios.post("/api/issues", data)
            router.push("/issues")
            //3-After we send the user to the issues page,we tells next JS
            //to refresh the content of the current route, which is in 
            //this case, the issues route.
            router.refresh()
            //----------------
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
                    <TextField.Input defaultValue={issue?.title} placeholder='title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => {
                        const { ref, ...rest } = field;
                        return <SimpleMDE placeholder='Description'  {...rest} />
                    }}

                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? "Update Issue" : "Submit New Issue"}{" "}
                    {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}


export default IssueForm


