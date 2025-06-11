"use client"

import Link from "next/link"
import Image from "next/image"
import { Play } from "lucide-react"
import type { Game } from "@/types/game"
import { titleToSlug, getGameThumbnailPath } from "@/lib/games"

interface GameGridProps {
  games: Game[]
}

export function GameGrid({ games }: GameGridProps) {
  return (
    <div className="games-grid">
      {games.map((game) => (
        <GameCard key={game.title} game={game} />
      ))}
    </div>
  )
}

interface GameCardProps {
  game: Game
}

function GameCard({ game }: GameCardProps) {
  const gameSlug = titleToSlug(game.title)
  const imagePath = getGameThumbnailPath(game)

  return (
    <Link href={`/game/${gameSlug}`} className="block">
      <div className="game-card h-full">
        {/* 游戏图片 */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imagePath}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
          
          {/* 播放按钮覆盖层 */}
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-cyan-400 rounded-full p-4 transform scale-75 hover:scale-100 transition-transform duration-300">
              <Play className="text-black" size={32} fill="currentColor" />
            </div>
          </div>

          {/* 游戏分类标签 */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-dark-400/80 backdrop-blur-sm text-cyan-400 text-xs font-cyber rounded-full border border-cyan-400/30">
              {game.category.replace(/^\//, '').replace(/\/$/, '').split('/')[0].toUpperCase()}
            </span>
          </div>

          {/* 特性标识 */}
          <div className="absolute top-3 right-3 flex gap-1">
            {game.hasControls && (
              <div className="w-2 h-2 bg-green-400 rounded-full" title="Has Controls" />
            )}
            {game.hasHowToPlay && (
              <div className="w-2 h-2 bg-blue-400 rounded-full" title="Has How to Play" />
            )}
            {game.hasDeveloper && (
              <div className="w-2 h-2 bg-purple-400 rounded-full" title="Has Developer Info" />
            )}
          </div>
        </div>

        {/* 游戏信息 */}
        <div className="p-4">
          <h3 className="font-cyber font-semibold text-lg text-white mb-2 line-clamp-2 hover:text-cyan-400 transition-colors">
            {game.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="flex items-center gap-1">
              🎮 Free to Play
            </span>
            {game.similarGamesCount > 0 && (
              <span className="text-cyan-400">
                +{game.similarGamesCount} similar
              </span>
            )}
          </div>

          {/* 快速播放按钮 */}
          <button className="w-full mt-3 cyber-button py-2 text-sm">
            Play Now
          </button>
        </div>
      </div>
    </Link>
  )
} 