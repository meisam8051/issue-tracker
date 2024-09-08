// 3-23-Discussion-Code Organization
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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createdIssuesSchema)
  })

  //1-----------
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
  //2-Some people argue that using axiots in the middle of a component 
  //violates the separation of concerns principle.What is separation of 
  //concerns?it's one of the old computer science principles that says 
  //we should separate a program into distinct modules each having a 
  //separate concern.If concerns are well separated, there are more 
  //opportunities for code reuse.
  //I don't see any value in moving this logic inside a separate function.
  //This is the only place where we need to create an issue.So we're not 
  //going to reuse this function in other parts of our application.
  //But in other applications, making HTTP calls might be more complicated.
  //For example, sometimes when calling third party APIs, we have to 
  //include certain HTTP headers in each request.In those cases, we don't
  //want to throw all that complexity inside our components, so it's 
  //better to move the logic for making HTTP calls into separate modules.


  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-3'>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      {/* 1------------------------------------- */}
      <form className=' space-y-3' onSubmit={onSubmit}>

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
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}


export default NewIssuePage