// 3-16-Customizing Radix UI Theme
import '@radix-ui/themes/styles.css'
import { Theme, ThemePanel } from "@radix-ui/themes"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
//1-By adding the <ThemePanel> component inside <Theme>, from radix-ui,  
//we get a panel for customizing our theme.(figure 16-1).We set our style 
//then copy theme and paste it instead of <Theme>.
//then Remove The <ThemePanel> .
//Go to app/layout copy 5.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="light" accentColor="violet">
          <NavBar />
          <main className='px-5'>
            {children}
          </main>
          <ThemePanel />
        </Theme>
      </body>
    </html>
  )
}