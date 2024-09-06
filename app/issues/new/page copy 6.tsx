// 3-18-Handling Form Submission
"use client"

import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface IssueForm {
  title: string,
  description: string
}


const NewIssuePage = () => {


  const { register, control,handleSubmit } = useForm<IssueForm>()

  return (
    //10-Now we should handle the form submission.For that we destructure
    //"handlesubmit()" function from "useForm()".then we change our div 
    //to "form tag" and set an "onSubmit" and call "handlesubmit()" 
    //function as the value of onSubmit event and And give it a function 
    //that will be called when our form is submitted.This function get 
    //"data prop" as our data that we enter to our form.
    //Go to page copy 7.tsx
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit((data)=>console.log(data))}>
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