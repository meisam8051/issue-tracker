// 3-17-Adding a Markdown Editor
"use client"

import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
//1- we import the simple MD component and a corresponding CSS file.
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='title' />
      </TextField.Root>
      {/* 2-then we replace <TeaxtArea> with <SimpleMDE> */}
      <SimpleMDE placeholder='Description'/>
      <Button>Submit New Issue</Button>
    </div>
  )
}
//3-Now we have this markdown editor.(fig 17-2).We can also customize it.

export default NewIssuePage