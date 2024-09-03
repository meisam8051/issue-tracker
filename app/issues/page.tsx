// 3-15-Building the New Issue Page

import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuePage = () => {
  return (
    <div><Button><Link href="/issues/new">New Issues</Link></Button></div>
  )
}

// Go to issues/new/page.tsx

export default IssuePage