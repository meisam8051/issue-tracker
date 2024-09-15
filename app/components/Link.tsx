// 4-30-Building a Styled Link Component
import React, { ReactNode } from 'react'

import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'


interface Props {
    href: string
    children: ReactNode
}
//9-So to do that, we have to apply two props to the next link component.
//One is "passHref" to pass the href prop to the child component.And the 
//other is "legacyBehavior".
const Link = ({href,children}:Props) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NextLink>
    )
}

export default Link