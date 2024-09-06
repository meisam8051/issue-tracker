// 3-18-Handling Form Submission
"use client"

import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
//1-we import useForm hook.
import { useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

//2-Next we define an interface that defines the shape of our form.It 
//specifies what fields we have and what are their types.
interface IssueForm {
  title: string,
  description: string
}


const NewIssuePage = () => {

  //3-So here we call useForm, and in angle brackets, we specify the 
  //shape of our form.We call this function and get an object.Now we 
  //destructure that object to grab the "register function".Using this 
  //function, we can register our input fields with react-hook-form, so
  //it can keep track of them.
  const { register } = useForm<IssueForm>()

  //4-The output of register function is an object with four properties,
  //So these are the props that we should apply to an input field, so 
  //react-hook-form can keep track of changes in that input field.
  //(fig 18-2)
  // console.log(register("title"))

  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        {/* 5-Then call the register function in this input component
         So inside braces, we call the register function and register 
         this input field with react-hook-form.Now you saw that the 
         register function returns an object with four properties, so 
         here we have to use the spread operator, so we can add those 
         properties as props to this component.
          Go to new/page copy 5.tsx*/}
        <TextField.Input placeholder='title' {...register('title')} />
      </TextField.Root>
       <SimpleMDE placeholder='Description'/>
      <Button>Submit New Issue</Button>
    </div>
  )
}


export default NewIssuePage