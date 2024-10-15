//6-47-Removing Duplicate Skeletons

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiButterflyDuotone } from "react-icons/pi";


import classnames from 'classnames';

const NavBar = () => {

    const currentPath = usePathname()

    const links = [
        { label: "Dashboard", href: "/" },
        //2-Here we have a link to "the issues page".We have to change 
        //this to "/issues/list".
        //Go to isseus/[id]/DeleteIssueButton copy 7.tsx
        { label: "Issues", href: "/issues/list" }
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><PiButterflyDuotone /></Link>
            <ul className='flex space-x-6'>
                {links.map((link) =>
                    <Link
                        key={link.href}
                        className={
                            classnames({
                                "text-zinc-900": currentPath === link.href,
                                "text-zinc-500": currentPath !== link.href,
                                "hover:text-zinc-800 transition-colors": true
                            })
                        }
                        href={link.href}>{link.label}
                    </Link>
                )
                }
            </ul>
        </nav >
    )
}


export default NavBar