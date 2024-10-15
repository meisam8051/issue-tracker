// 3-22-Adding a Spinner
"use client"

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { createdIssuesSchema } from '@/app/validationSchemas';
import { z } from "zod"
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createdIssuesSchema>



const NewIssuePage = () => {
  const router = useRouter()

  const [error, setError] = useState("");
  //3---------------
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createdIssuesSchema)
  })

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-3'>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form className=' space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          //4-----------------
          setIsSubmitting(true)
          await axios.post("/api/issues", data)
          router.push("/issues")
        } catch (error) {
          //4-------------------------
          setIsSubmitting(false)
          setError("Unexpected error has occurred!")
        }

      })}>

        <TextField.Root>
          <TextField.Input placeholder='title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        {/*5-We use disabled prop to prevent the user from submitting 
        the form twice. */}
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}


export default NewIssuePage