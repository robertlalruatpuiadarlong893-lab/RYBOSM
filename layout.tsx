import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RYBOSM — Biology Specimen Drills',
  description: 'A flashcard drill for biology topics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="specimen-bg min-h-screen font-mono">{children}</body>
    </html>
  )
}
