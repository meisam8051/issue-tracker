//7-55-Refactoring the NavBar

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiButterflyDuotone } from "react-icons/pi";


import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';


const NavBar = () => {

    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/"><PiButterflyDuotone /></Link>
                    <NavLinks/>
                    </Flex>
                <AuthStatus/>
                </Flex>
            </Container>
        </nav >
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === "loading") return null;

    if (status === "unauthenticated")
        //9-
        return <Link className='nav-link' href="/api/auth/signin">Login</Link>
    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback="?"
                        size="2"
                        radius='full'
                        className="cursor-pointer"
                        referrerPolicy='no-referrer'
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Logout</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box >
    )
}


const NavLinks = () => {
    const currentPath = usePathname()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]
    return (
        <ul className='flex space-x-6'>
            {links.map((link) =>
                <li key={link.href}>
                    <Link
                        className={
                            classnames({
                                //9-
                                "nav-link": true,
                                //Here we have conflict between two 
                                //classes "nav-link" and "text-zink-900" .
                                //For solving that we use ! mark to 
                                //overwrite text-zinc-900 to "nav-link".
                                "!text-zinc-900": currentPath === link.href,
                            })
                        }
                        href={link.href}>{link.label}
                    </Link>
                </li>
            )
            }
        </ul>
    )

}

export default NavBar