import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cosmic Gaming Hub - Laptop Games Collection',
  description: 'Discover amazing laptop-friendly games including clickers, puzzles, and strategy games. Perfect for casual gaming sessions.',
  keywords: 'games, laptop games, clicker games, puzzle games, strategy games, casual gaming',
  authors: [{ name: 'Cosmic Gaming Hub' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-gaming">
          <Header />
          <main className="pb-20">
            {children}
          </main>
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  )
}