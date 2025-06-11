import type { Metadata } from 'next'
import { PageContent } from '@/components/PageContent'

export const metadata: Metadata = {
  title: 'OnlineGame.run - Play Free Online Games | Action, Puzzle, Racing & More',
  description: 'Discover thousands of free online games at OnlineGame.run. Play action games, puzzle games, racing games, adventure games and more instantly in your browser. No downloads required!',
  alternates: {
    canonical: 'https://www.onlinegame.run',
  },
}

export default function HomePage() {
  return <PageContent />
} 