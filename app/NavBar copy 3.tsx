//2-9-Styling the Active Link

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiButterflyDuotone } from "react-icons/pi";



const NavBar = () => {

    const currentPath = usePathname()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ]
    //1-To do that In this component, we have to use one of the hooks that
    //comes with next JS to get the *current path* or the *current route*.
    //That is *usePathname()*

    //Now because in this component, we are using this hook and this hook
    //is dependent on *browser APIs*, we have to convert this component to
    //a "client component".Because as I told you in part one, we can only 
    //access browser APIs in client components.
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><PiButterflyDuotone /></Link>
            <ul className='flex space-x-6'>
                {links.map((link) =>
                    <Link
                        key={link.href}
                        className={`${link.href === currentPath ? "text-zinc-900" : "text-zinc-500"} hover:text-zinc-800 transition-colors`}
                        href={link.href}>{link.label}
                    </Link>
                )
                    //2-Now as our applications get more complex, we might
                    //end up with complicated conditions here and tracking
                    //what classes are rendered can be a little bit 
                    //difficult. 
                    //Go to NavBar copy 4.tsx

                }
            </ul>
        </nav >
    )
}

export default NavBar