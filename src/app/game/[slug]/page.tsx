import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GameDetailContent } from '@/components/GameDetailContent'
import { getGameBySlug, getAllGames, titleToSlug } from '@/lib/games'

// 生成静态参数用于静态生成
export async function generateStaticParams() {
  const games = getAllGames()
  
  return games.slice(0, 100).map((game) => ({
    slug: titleToSlug(game.title),
  }))
}

// 生成动态metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const game = getGameBySlug(params.slug)
  
  if (!game) {
    return {
      title: 'Game Not Found - OnlineGame.run',
      description: 'The requested game could not be found.'
    }
  }

  const gameTitle = game.title
  const gameCategory = game.category.replace(/^\//, '').replace(/\/$/, '').split('/')[0]
  
  return {
    title: `${gameTitle} - Play Free Online Game | OnlineGame.run`,
    description: `Play ${gameTitle} for free online. ${gameCategory} game that you can play instantly in your browser. No downloads required!`,
    keywords: `${gameTitle}, ${gameCategory} games, free online games, browser games, play ${gameTitle} online`,
    alternates: {
      canonical: `https://www.onlinegame.run/game/${params.slug}`,
    },
    openGraph: {
      title: `${gameTitle} - Free Online Game`,
      description: `Play ${gameTitle} for free online. ${gameCategory} game with instant browser play.`,
      url: `https://www.onlinegame.run/game/${params.slug}`,
      images: [
        {
          url: `/improved-game-data/images/${game.localThumbnail}`,
          width: 800,
          height: 600,
          alt: gameTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${gameTitle} - Free Online Game`,
      description: `Play ${gameTitle} for free online. ${gameCategory} game with instant browser play.`,
      images: [`/improved-game-data/images/${game.localThumbnail}`],
    },
  }
}

// 使用Next.js接受的Page组件签名
export default async function GamePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const game = getGameBySlug(params.slug)
  
  if (!game) {
    notFound()
  }

  return <GameDetailContent game={game} />
} 