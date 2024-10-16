//7-54-Troubleshooting- Avatar Not Loading

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiButterflyDuotone } from "react-icons/pi";


import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {


    const { status, data: session } = useSession()

    const currentPath = usePathname()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]

    return (
        <nav className='border-b mb-5 px-5 py-3'>
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
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                             
                                    <Avatar
                                        src={session.user!.image!}
                                        fallback="?"
                                        size="2"
                                        radius='full'
                                        className="cursor-pointer"
                                        //1-We have a prop for setting
                                        //the Refer policy, but this is
                                        //kind of flaky.Sometimes it works.
                                        //Sometimes it doesn't.
                                        //Go to next.config.js
                                        referrerPolicy='no-referrer'
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size="2">
                                            {session.user!.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href="/api/auth/signout">Logout</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        }
                        {status === "unauthenticated" &&
                            <Link href="/api/auth/signin">Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav >
    )
}


export default NavBar