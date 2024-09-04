// 3-15-Building the New Issue Page

"use client"

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

//3-When we click on New Issue button, we get an error saying cannot 
//access "Textfield.root" on the server.So because we're building a 
//form and building forms requires "user interaction", so the Textfield 
//component cannot be rendered "on the server".So we should change it to
//"client component".(figure 15-3)

//4-Right after that, we want to add a text area.you will find the 
//text area component in documentaion of radix.(figure 15-4) and apply
//it here.
//In the end we have this.(figure 15-5)

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='title' />
      </TextField.Root>
      <TextArea placeholder='Description'/>
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage