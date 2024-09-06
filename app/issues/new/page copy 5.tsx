// 3-18-Handling Form Submission
"use client"

import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
//7-To solve this issue, we have to use the controller component in 
//react-hook-form.
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface IssueForm {
  title: string,
  description: string
}


const NewIssuePage = () => {


  const { register, control } = useForm<IssueForm>()

  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='title' {...register('title')} />
      </TextField.Root>
      {/* 6-we cannot use the same technique with the simple mde component,
       because it doesn't support "additional props" using "the spread 
       operator". */}
      {/* 8-So instead of directly rendering this simplemde component, 
      we have to render a "controller component". */}
      <Controller
        name='description'
        control={control}
        render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
      />
      {/* 9-here we have to set a few props, the first one is "name", 
         which we set here to "description". the second one is "control", 
         and we set this to the "control object" that we can get from the 
         "useForm hook".And finally, here we set the "render prop" to a 
         function for rendering an "input field".This is where we render
         a "simplemde editor".Now the final step, we give this function
         an argument and de-structuring to grab the "field property".Now 
         this field has the same properties that you saw earlier, like 
         onBlur, onChange, and so on.So this is where we add braces to 
         spread the field object.
         Go to new/page copy 6.tsx*/}
      <Button>Submit New Issue</Button>
    </div>
  )
}


export default NewIssuePage