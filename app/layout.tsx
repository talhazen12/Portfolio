import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Cursor from '@/components/Cursor'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Talha Hasnain | Business Analyst and Student',
  description: 'A scrollytelling personal portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#121212] text-white min-h-screen`}>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
