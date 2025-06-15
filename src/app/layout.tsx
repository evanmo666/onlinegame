import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

// 单独导出viewport配置
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'OnlineGame.run - Play Free Online Games',
  description: 'Discover amazing free online games on OnlineGame.run. Play action, adventure, puzzle, racing, and more games instantly in your browser. No downloads required!',
  keywords: 'online games, free games, browser games, action games, puzzle games, racing games, adventure games, multiplayer games',
  authors: [{ name: 'OnlineGame.run Team' }],
  creator: 'OnlineGame.run',
  publisher: 'OnlineGame.run',
  robots: 'index, follow',
  metadataBase: new URL('https://www.onlinegame.run'),
  alternates: {
    canonical: 'https://www.onlinegame.run',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.onlinegame.run',
    title: 'OnlineGame.run - Play Free Online Games',
    description: 'Discover amazing free online games. Play action, adventure, puzzle, racing games and more instantly in your browser!',
    siteName: 'OnlineGame.run',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OnlineGame.run - Free Online Games',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OnlineGame.run - Play Free Online Games',
    description: 'Discover amazing free online games. Play instantly in your browser!',
    images: ['/og-image.jpg'],
  },
  other: {
    'theme-color': '#0ea5e9',
    'color-scheme': 'dark',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics代码 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7KTE1NMX96"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7KTE1NMX96');
          `}
        </Script>
        {/* 预加载关键字体 */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Press+Start+2P&display=swap"
          as="style"
        />
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'OnlineGame.run',
              url: 'https://www.onlinegame.run',
              description: 'Free online games platform with action, adventure, puzzle, racing games and more.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.onlinegame.run/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-gradient-dark min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
} 