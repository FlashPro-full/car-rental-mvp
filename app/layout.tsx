import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Car Rental Management System',
  description: 'Manage your car rental business efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

