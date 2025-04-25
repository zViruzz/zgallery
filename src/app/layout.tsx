import type { Metadata } from 'next'
import { Bakbak_One } from 'next/font/google'
import './globals.css'

const BakbakOne = Bakbak_One({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'zGallery',
  description: 'Image and video gallery'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={BakbakOne.className}>{children}</body>
    </html>
  )
}
