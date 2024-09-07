// 3-20-Implementing Client-side Validation
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
//6-In the future, if we decide to extend this form and add a new 
//property, we have to add it in two places in this validation schema
//and also in this interface.For solving that, We could generate this 
//interface based on our schema.
//
// interface IssueForm {
//   title: string,
//   description: string
// }
//
//So now we are letting Zod infer this type based on this schema.
type IssueForm =z.infer<typeof createdIssuesSchema>



const NewIssuePage = () => {
  const router = useRouter()

  const [error, setError] = useState("");

//7-Now to display validation errors,here we have to grab the form state 
//object from useForm().This object represents everything we need to know
//about our form.we destructure it and inside it we destructure the 
//"errors property".
//There is also some properties like isValid If you want to know the form
//is changed.isvalid if you want to disable the submit button if the form 
//is not valid and so on.

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
        {/* 8-Here we use it.And for showing this error here we used Text
        component from Radix UI.Because Text component is a span for 
        preventing styling issues we canged it to "p tag" by as property. */}
        {errors.title && <Text color='red'>{errors.title.message}</Text>}
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