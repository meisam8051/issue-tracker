// 3-20-Implementing Client-side Validation
"use client"

import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
//4-Next we import zodResolver.
import { zodResolver } from '@hookform/resolvers/zod';
import { createdIssuesSchema } from '@/app/validationSchemas';

interface IssueForm {
  title: string,
  description: string
}
//3-Now to use this zod validation in our form, first we have to install
//a package:

//->npm i @hookform/resolvers@3.3.1

//This package allows "React hook form" to "integrate" with various data 
//validation libraries like "Zod".



const NewIssuePage = () => {
  const router = useRouter()

  const [error, setError] = useState("");
//5-Now when calling the useForm hook, here we pass a configuration 
//object and set the "resolver" property to "zodResolver" and here we 
//pass our Zod schema that is "createdIssuesSchema" to "zodResolver".
//Go to /new/page copy 11.tsx
  const { register, control, handleSubmit } = useForm<IssueForm>({
    resolver:zodResolver(createdIssuesSchema)
  })

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
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
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}


export default NewIssuePage