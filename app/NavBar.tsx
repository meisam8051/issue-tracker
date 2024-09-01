//2-9-Styling the Active Link

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { PiButterflyDuotone } from "react-icons/pi";

//3-In this case we use a classnames package.let's install:
//npm classnames@2.3.2


import classnames from 'classnames';
//4-Now this is a function that we call and give it an object.In this 
//object, we specify the classes that we want to render and the 
//conditions that they should be rendered.This function will then
//return a string that contains the classes we want to render.


const NavBar = () => {

    const currentPath = usePathname()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
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
                                // 5-In this object, we add one or more 
                                //key value pairs.Our keys should be 
                                //our CSS classes And the values should 
                                //be either true, false or condition.If 
                                //we set this to true, this class will 
                                //always be rendered.
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