// 3-18-Handling Form Submission
"use client"

import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string,
  description: string
}


const NewIssuePage = () => {
  const router =useRouter()
  //12-Now finally, we want to "redirect" the user to the "issues page".
  //To do that, we have to use the "router hook" in Next.js.

  const { register, control, handleSubmit } = useForm<IssueForm>()
//11-Instead of logging this data object on the console, we want to
//send it to our API and save it in the database.To do that, we're going 
//to use "axios".We can also use the "fetch function" in browsers.let's 
//install and import it.
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async(data) => { 
      await axios.post("/api/issues", data) 
      router.push("/issues")
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
  )
}


export default NewIssuePage