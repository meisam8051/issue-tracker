// 4-32-Disabling Server-side Rendering
"use client"

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
//1-Instead of statically importing the SimpleMDE component,we import it
//dynamically.
// import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { createdIssuesSchema } from '@/app/validationSchemas';
import { z } from "zod"
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

//2-we import the dynamic function
import dynamic from 'next/dynamic';
import delay from 'delay';
//3-Then we dynamically load this component.This is called lazy loading.
const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }//4-We tell next JS not to render this component on the 
  //server.
)

type IssueForm = z.infer<typeof createdIssuesSchema>



const NewIssuePage = () => {

  const router = useRouter()

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
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
          <TextField.Input placeholder='title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => {
            //5-After that we got another error that we solve that
            //like this (fig 32-4 )
            const { ref, ...rest } = field;
            //--------------------------------
            return <SimpleMDE placeholder='Description'  {...rest} />
          }}

        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}


export default NewIssuePage