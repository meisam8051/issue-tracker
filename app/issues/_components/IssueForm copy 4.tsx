//5-40- Improving the Loading Experience
"use client"

import { ErrorMessage, Spinner } from '@/app/components';
import { IssuesSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Callout, TextField, Button } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import "easymde/dist/easymde.min.css";
import { Issue } from '@prisma/client';
//4-So we import it statically.
import SimpleMDE from 'react-simplemde-editor';


//4-With loading dynamically the entire IssueForm we don't need to load
//dynamically the SimpleMDE component.
// const SimpleMDE = dynamic(
//     () => import("react-simplemde-editor"),
//     { ssr: false }
// )

//Go to issues/new/page copy 20.tsx

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
            router.refresh()
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


