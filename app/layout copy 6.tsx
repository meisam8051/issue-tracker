//5-41-Adding a Delete Button
import '@radix-ui/themes/styles.css'
import "./theme-config.css"
import './globals.css'
import { Container, Theme } from "@radix-ui/themes"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="violet">
          <NavBar />
          <main className='px-5'>
            {/* 12-Here we wrap our pages inside the container component.
             */}
            <Container>
              {children}
            </Container>
          </main>
        </Theme>
      </body>
    </html>
  )
}