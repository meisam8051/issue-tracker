//7-53-Adding a Drop-down Menu

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
                            //1-Here we use the Dropdown menu from radix-ui
                            //(fig 53-2)
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    {/*2-Here we know that session.user
                                     is defined because status is 
                                     authenticated.So here we add an 
                                     exclamation mark.
                                     The src can be string or undefined 
                                     but the image property can be string 
                                     or null or undefined.So we use
                                     an exclamation mark to fix that */}
                                    <Avatar
                                        src={session.user!.image!}
                                        //3-we should also set fallback to 
                                        //something that will be displayed
                                        //if the user doesn't have an image.
                                        fallback="?"
                                        //4-We use size prop to make our 
                                        //avatar smaller
                                        size="2"
                                        //5-We use radius and set it to full
                                        //for making it look round.
                                        radius='full'
                                        className="cursor-pointer"
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    {/* 6-label for showing the user email */}
                                    <DropdownMenu.Label>
                                        <Text size="2">
                                            {session.user!.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    {/* 7-here we shows our items. */}
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