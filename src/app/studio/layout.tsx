import { type Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Shopper',
    description: 'an ecommerce platform for the modern world'
}

export default function StudioLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body cz-shortcut-listen="true" >
                {children}
            </body>
        </html>
    )
}