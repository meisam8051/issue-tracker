//2-8-Building the navbar
import Link from 'next/link'
import React from 'react'
import { PiButterflyDuotone } from "react-icons/pi";

const NavBar = () => {
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><PiButterflyDuotone /></Link>
            <ul className='flex space-x-6'>
                <li>
                    <Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href="/">Dashboard</Link>
                </li>
                <li>
                    <Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href="/issues">Issues</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar