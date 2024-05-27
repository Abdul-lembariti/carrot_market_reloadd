import type { Metadata } from 'next'
import { Roboto, Rubik_Scribble } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--roboto-text',
})

const rubick = Rubik_Scribble({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--rubick-text',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Karrot Market',
    default: 'Karrot Market',
  },
  description: 'Sale and buy with Karrot Market',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log(roboto)
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${rubick.variable} bg-neutral-900 text-white max-w-screen-sm mx-auto`}>
        {children}
      </body>
    </html>
  )
}
