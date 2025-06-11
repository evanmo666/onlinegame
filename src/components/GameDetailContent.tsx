"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Share2, ExternalLink, Facebook, Twitter, Linkedin, Copy, Check, Gamepad2, Book, User, Clock, Star } from "lucide-react"
import type { Game, GameContent } from "@/types/game"
import { getSimilarGames, getGameContent } from "@/lib/games"
import { GameGrid } from "@/components/GameGrid"

interface GameDetailContentProps {
  game: Game
}

export function GameDetailContent({ game }: GameDetailContentProps) {
  const [gameContent, setGameContent] = useState<GameContent | null>(null)
  const [similarGames, setSimilarGames] = useState<Game[]>([])
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [isGameLoaded, setIsGameLoaded] = useState(false)

  // 加载游戏详细内容和相似游戏
  useEffect(() => {
    async function loadGameData() {
      // 加载游戏详细内容
      const content = await getGameContent(game.title)
      setGameContent(content)
      
      // 加载相似游戏
      const similar = getSimilarGames(game, 6)
      setSimilarGames(similar)
    }
    
    loadGameData()
  }, [game])

  // 分享功能
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = `Play ${game.title} - Free Online Game`
  const shareText = `Check out this awesome game: ${game.title}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-50 bg-dark-400/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors">
              <ArrowLeft size={24} />
              <span className="font-cyber font-semibold">Back to Games</span>
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setIsShareOpen(!isShareOpen)}
                className="flex items-center gap-2 cyber-button px-4 py-2"
              >
                <Share2 size={18} />
                Share Game
              </button>
              
              {/* 分享菜单 */}
              {isShareOpen && (
                <div className="absolute right-0 top-full mt-2 bg-dark-300 border border-gray-600 rounded-lg p-4 w-64 z-50">
                  <h3 className="font-cyber font-semibold text-cyan-400 mb-3">Share this game</h3>
                  
                  <div className="space-y-3">
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-button facebook w-full justify-start gap-3 px-3 py-2"
                    >
                      <Facebook size={20} />
                      Share on Facebook
                    </a>
                    
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-button twitter w-full justify-start gap-3 px-3 py-2"
                    >
                      <Twitter size={20} />
                      Share on Twitter
                    </a>
                    
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-button linkedin w-full justify-start gap-3 px-3 py-2"
                    >
                      <Linkedin size={20} />
                      Share on LinkedIn
                    </a>
                    
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center justify-start gap-3 px-3 py-2 w-full border-2 border-gray-500 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 rounded-lg"
                    >
                      {copySuccess ? <Check size={20} /> : <Copy size={20} />}
                      {copySuccess ? 'Link Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 游戏标题和信息 */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-cyber font-bold gradient-text mb-4">
            {game.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm font-cyber rounded-full border border-cyan-400/30">
              {game.category.replace(/^\//, '').replace(/\/$/, '').split('/')[0].toUpperCase()}
            </span>
            
            {game.hasControls && (
              <span className="flex items-center gap-2 px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">
                <Gamepad2 size={16} />
                Controls Guide
              </span>
            )}
            
            {game.hasHowToPlay && (
              <span className="flex items-center gap-2 px-3 py-1 bg-blue-400/20 text-blue-400 text-sm rounded-full">
                <Book size={16} />
                How to Play
              </span>
            )}
            
            {game.hasDeveloper && (
              <span className="flex items-center gap-2 px-3 py-1 bg-purple-400/20 text-purple-400 text-sm rounded-full">
                <User size={16} />
                Developer Info
              </span>
            )}
          </div>

          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            {gameContent?.content.howToPlay || 
             `Experience the thrill of ${game.title}! This ${game.category.replace(/^\//, '').replace(/\/$/, '').split('/')[0]} game offers exciting gameplay that you can enjoy instantly in your browser. No downloads required - just click and play!`}
          </p>
        </div>

        {/* 游戏播放区域 */}
        <div className="mb-12">
          <div className="game-iframe-container mb-4">
            {!isGameLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-300">
                <div className="text-center">
                  <div className="loading-spinner w-16 h-16 mx-auto mb-4"></div>
                  <p className="text-cyan-400 font-cyber text-lg">Loading Game...</p>
                </div>
              </div>
            )}
            
            <iframe
              src={game.gameFrame}
              className="game-iframe"
              title={game.title}
              allowFullScreen
              onLoad={() => setIsGameLoaded(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock size={16} />
                Instant Play
              </span>
              <span className="flex items-center gap-1">
                🎮 Free to Play
              </span>
              <span className="flex items-center gap-1">
                📱 Cross Platform
              </span>
            </div>
            
            <a
              href={game.gameFrame}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ExternalLink size={16} />
              Open in new tab
            </a>
          </div>
        </div>

        {/* 游戏详细信息 */}
        {gameContent && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 游戏玩法 */}
              {gameContent.content.howToPlay && (
                <section>
                  <h2 className="text-2xl font-cyber font-bold text-cyan-400 mb-4">
                    How to Play {game.title}
                  </h2>
                  <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
                    <p className="text-gray-300 leading-relaxed">
                      {gameContent.content.howToPlay}
                    </p>
                  </div>
                </section>
              )}

              {/* 游戏控制 */}
              {gameContent.content.controls.length > 0 && (
                <section>
                  <h2 className="text-2xl font-cyber font-bold text-cyan-400 mb-4">
                    Game Controls
                  </h2>
                  <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {gameContent.content.controls[0].split(/(?=[A-Z])/).map((control, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-dark-300 rounded">
                          <Gamepad2 size={16} className="text-cyan-400" />
                          <span className="text-gray-300 text-sm">{control.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* 开发者信息 */}
              {gameContent.content.developer && (
                <section>
                  <h2 className="text-2xl font-cyber font-bold text-cyan-400 mb-4">
                    Developer Information
                  </h2>
                  <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
                    <p className="text-gray-300">{gameContent.content.developer}</p>
                  </div>
                </section>
              )}
            </div>

            {/* 侧边栏信息 */}
            <div className="space-y-6">
              {/* 游戏截图 */}
              <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
                <h3 className="font-cyber font-semibold text-cyan-400 mb-4">Game Preview</h3>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={`/improved-game-data/images/${game.localThumbnail}`}
                    alt={game.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* 游戏统计 */}
              <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
                <h3 className="font-cyber font-semibold text-cyan-400 mb-4">Game Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Category</span>
                    <span className="text-white font-medium">
                      {game.category.replace(/^\//, '').replace(/\/$/, '').split('/')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Platform</span>
                    <span className="text-white font-medium">Web Browser</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cost</span>
                    <span className="text-green-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Rating</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 相似游戏推荐 */}
        {similarGames.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-cyber font-bold gradient-text">
                More Games Like This
              </h2>
              <Link href="/" className="cyber-button px-4 py-2 text-sm">
                View All Games
              </Link>
            </div>
            
            <GameGrid games={similarGames} />
          </section>
        )}
      </div>
    </div>
  )
} 