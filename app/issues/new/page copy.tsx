// 3-15-Building the New Issue Page
import { TextField } from '@radix-ui/themes'
import React from 'react'

//1-We apply TextField component here.

const NewIssuePage = () => {
  return (
    <div>
      <TextField.Root>
        <TextField.Input placeholder='Title' />
      </TextField.Root>
    </div>
  )
}
//2-For linking this page to "/issues page" we go to app/issues/page.tsx

export default NewIssuePage