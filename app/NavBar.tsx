//7-52-Change the Layout of the NavBar

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiButterflyDuotone } from "react-icons/pi";


import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {


    const { status, data: session } = useSession()

    const currentPath = usePathname()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]

    //1-So here we have a bunch of tailwind classes.So now going forward,
    //we want to simplify this code.We want to replace some of these 
    //tailwind classes with radix UI components.
    //So we remove the flex class, space-x-6,items-center from our nav tag.
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            {/* 2-We use continer tag from radix ui to bring our navbar 
            in the middle of our page. */}
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/"><PiButterflyDuotone /></Link>
                        <ul className='flex space-x-6'>
                            {links.map((link) =>
                                <li key={link.href}>
                                    <Link
                                        className={
                                            classnames({
                                                "text-zinc-900": currentPath === link.href,
                                                "text-zinc-500": currentPath !== link.href,
                                                "hover:text-zinc-800 transition-colors": true
                                            })
                                        }
                                        href={link.href}>{link.label}
                                    </Link>
                                </li>
                            )
                            }
                        </ul>
                    </Flex>
                    <Box>
                        {status === "authenticated" &&
                            <Link href="/api/auth/signout">Logout</Link>}
                        {status === "unauthenticated" &&
                            <Link href="/api/auth/signin">Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav >
    )
}


export default NavBar