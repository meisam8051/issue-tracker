//7-51-Adding the Login and Logout Links

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiButterflyDuotone } from "react-icons/pi";


import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {

    //3-With this, we can get access to the current authentication 
    //session.
    const { status, data: session } = useSession()
    //---------

    const currentPath = usePathname()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
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
            {/*4--------*/}
            <Box>
                {status === "authenticated" &&
                    <Link href="/api/auth/signout">Logout</Link>}
                {status === "unauthenticated" &&
                    <Link href="/api/auth/signin">Login</Link>}
            </Box>
            {/* -------- */}
        </nav >
    )
}


export default NavBar