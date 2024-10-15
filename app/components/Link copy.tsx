// 4-30-Building a Styled Link Component
import React, { ReactNode } from 'react'
//6-Because of duplication of names we change our Link component in both
//RadixUi and Nextjs.
import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'


interface Props {
    href: string
    children: ReactNode
}

const Link = ({href,children}:Props) => {
    return (
        //7-First we have to return a next link.So we get client side 
        //navigation And then we add radix link for styling.
        <NextLink href={href}>
            <RadixLink>{children}</RadixLink>
        </NextLink>
    )
}
//8-After using this custom Link component in our issues page we get an
//error (fig 30-4).For that we search "next JS link component" and go
//to https://nextjs.org/docs/pages/api-reference/components/link , then 
//search "custom component" Here we can find instructions for using a 
//custom component like a radix link as a child of next link.
//Go to components/Link.tsx

export default Link