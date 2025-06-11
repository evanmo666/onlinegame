"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, ExternalLink } from "lucide-react"
import type { Game } from "@/types/game"
import { titleToSlug, getGameThumbnailPath } from "@/lib/games"

interface GameListProps {
  games: Game[]
}

export function GameList({ games }: GameListProps) {
  return (
    <div className="space-y-4">
      {games.map((game) => (
        <GameListItem key={game.title} game={game} />
      ))}
    </div>
  )
}

interface GameListItemProps {
  game: Game
}

function GameListItem({ game }: GameListItemProps) {
  const gameSlug = titleToSlug(game.title)
  const imagePath = getGameThumbnailPath(game)

  return (
    <div className="bg-dark-200 border border-gray-700 rounded-lg p-4 hover:border-cyan-400 transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 游戏图片 */}
        <div className="relative w-full sm:w-48 aspect-video rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={imagePath}
            alt={game.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 192px"
          />
          
          {/* 播放覆盖层 */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-cyan-400 rounded-full p-3">
              <Play className="text-black" size={24} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* 游戏信息 */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-cyber font-semibold text-white hover:text-cyan-400 transition-colors">
                  {game.title}
                </h3>
                <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs font-cyber rounded-full">
                  {game.category.replace(/^\//, '').replace(/\/$/, '').split('/')[0].toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  🎮 Free to Play
                </span>
                <span className="flex items-center gap-1">
                  ⚡ Instant Play
                </span>
                {game.similarGamesCount > 0 && (
                  <span className="text-cyan-400">
                    +{game.similarGamesCount} similar games
                  </span>
                )}
              </div>

              {/* 特性标识 */}
              <div className="flex items-center gap-2 mb-4">
                {game.hasControls && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                    🎯 Controls Guide
                  </span>
                )}
                {game.hasHowToPlay && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-blue-400/20 text-blue-400 text-xs rounded-full">
                    📖 How to Play
                  </span>
                )}
                {game.hasDeveloper && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-purple-400/20 text-purple-400 text-xs rounded-full">
                    👨‍💻 Developer Info
                  </span>
                )}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col gap-2 sm:min-w-[120px]">
              <Link href={`/game/${gameSlug}`} className="cyber-button text-center py-2 px-4 text-sm">
                Play Now
              </Link>
              <a 
                href={game.gameFrame} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-300 border border-gray-600 rounded-lg text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 text-sm"
              >
                <ExternalLink size={14} />
                Direct Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 