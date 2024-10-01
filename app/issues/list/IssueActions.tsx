// 4-26-Adding Loading Skeletons
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

//9-we add a new component in the Issues folder, because this is the only
//place where we need this component.and cut the button section in our
//issues page and paste it here.
//Go to issues/page copy 8.tsx


const IssueActions = () => {
    return (
        <div className='mb-5'>
            <Button><Link href="/issues/new">New Issues</Link></Button>
        </div>
    )
}

export default IssueActions