import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import { Header } from './header'
import { Providers } from './provider'

export const metadata: Metadata = {
  title: 'Dev Finder',
  description:
    'An application to help pair programming with random devs online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Providers>
            <NextTopLoader />
            <Header />
            <div className="container mx-auto">{children}</div>
            <Toaster />
          </Providers>
        </body>
      </html>
    </>
  )
}
