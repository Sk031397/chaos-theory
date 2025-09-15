import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chaos Conductor - Embrace Controlled Chaos',
  description: 'A revolutionary productivity app that introduces controlled chaos into your routine to boost creativity and break stagnation patterns.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen neural-bg overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}