// 3-21-Extracting the ErrorMessage
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

type IssueForm =z.infer<typeof createdIssuesSchema>



const NewIssuePage = () => {
  const router = useRouter()

  const [error, setError] = useState("");


  const { register, control, handleSubmit,formState:{errors} } = useForm<IssueForm>({
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
          await axios.post("/api/issues", data)
          router.push("/issues")
        } catch (error) {
          setError("Unexpected error has occurred!")
        }

      })}>
        
        <TextField.Root>
          <TextField.Input placeholder='title' {...register('title')} />
        </TextField.Root>
        {/* 1-Every time we want to render an error, we have to remember 
        //to set these two props for <Text>.we can extract this markup
         and put it into a separate reusable component.
         Go to component/ErrorMessage.tsx*/}
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}


export default NewIssuePage