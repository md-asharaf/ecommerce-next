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
      <html lang="en">
        <body cz-shortcut-listen="true">
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <main>
            <Header />
            {children}
          </main>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  )
}