// 3-19-Handling Errors
"use client"

import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
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
  const router = useRouter()
//5-Here we want to show a generic error message for unexpected errors.
  const [error, setError] = useState("");

  const { register, control, handleSubmit } = useForm<IssueForm>()
  return (
    //6-For showing the error message we're going to use the callout 
    //component from the radix ui.(fig 19-4)
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