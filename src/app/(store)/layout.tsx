import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import '../globals.css'
import { Header } from '@/components/Header'
import { SanityLive } from '@/sanity/lib/live'
import { draftMode } from 'next/headers'
import DisableDraftMode from '@/components/DisableDraftMode'
import { VisualEditing } from 'next-sanity'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shopper',
  description: 'Shopper - Your one-stop shop for all your needs',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" className={inter.className}>
        <body>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <main className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 pt-16 bg-gray-100">
              {children}
            </div>
          </main>
          <SanityLive />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}