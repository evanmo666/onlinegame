"use client"

import { useState, useEffect } from "react"
import { getAllGames, getGameCategories } from "@/lib/games"
import type { Game, GameCategory } from "@/types/game"
import { AdminLayout } from "./AdminLayout"

export function AdminContent() {
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<GameCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const gamesData = getAllGames()
        const categoriesData = getGameCategories()
        setGames(gamesData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('加载管理数据出错:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  const totalGames = games.length
  const totalCategories = categories.length - 1 // 减去"All Games"分类
  const recentGames = games.slice(0, 5) // 最近添加的5个游戏

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="loading-spinner w-16 h-16 mx-auto mb-4"></div>
            <p className="text-cyan-400 font-cyber text-lg">加载中...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-cyber font-bold text-white mb-6">控制面板</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">游戏总数</p>
              <p className="text-3xl font-cyber font-bold text-cyan-400">{totalGames}</p>
            </div>
            <span className="text-5xl">🎮</span>
          </div>
        </div>
        
        <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">分类数量</p>
              <p className="text-3xl font-cyber font-bold text-purple-400">{totalCategories}</p>
            </div>
            <span className="text-5xl">🗂️</span>
          </div>
        </div>
        
        <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">系统状态</p>
              <p className="text-lg font-cyber font-bold text-green-400">正常运行中</p>
            </div>
            <span className="text-5xl">📊</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 快速操作 */}
        <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-cyber font-bold text-cyan-400 mb-4">快速操作</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/admin/games/add" className="cyber-button p-4 text-left">
              <div className="text-xl mb-2">➕</div>
              <div className="font-semibold">添加游戏</div>
              <div className="text-sm opacity-75">添加新游戏到平台</div>
            </a>
            
            <a href="/admin/games" className="cyber-button p-4 text-left">
              <div className="text-xl mb-2">🎮</div>
              <div className="font-semibold">管理游戏</div>
              <div className="text-sm opacity-75">编辑、删除游戏</div>
            </a>
            
            <a href="/admin/categories" className="cyber-button p-4 text-left">
              <div className="text-xl mb-2">🗂️</div>
              <div className="font-semibold">管理分类</div>
              <div className="text-sm opacity-75">组织游戏分类</div>
            </a>
            
            <a href="/admin/settings" className="cyber-button p-4 text-left">
              <div className="text-xl mb-2">⚙️</div>
              <div className="font-semibold">系统设置</div>
              <div className="text-sm opacity-75">配置系统参数</div>
            </a>
          </div>
        </div>
        
        {/* 最近添加的游戏 */}
        <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-cyber font-bold text-cyan-400 mb-4">最近添加的游戏</h2>
          
          <div className="overflow-hidden rounded-lg border border-gray-700">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-dark-300">
                  <th className="p-3 text-left">游戏名称</th>
                  <th className="p-3 text-left">分类</th>
                  <th className="p-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {recentGames.map((game) => (
                  <tr key={game.title} className="border-t border-gray-700">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-dark-300 rounded overflow-hidden">
                          <img 
                            src={`/improved-game-data/images/${game.localThumbnail}`}
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium truncate">{game.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400">
                      {game.category.replace(/^\/|\/$/g, '')}
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <a 
                          href={`/admin/games/edit/${encodeURIComponent(game.title)}`}
                          className="p-1 text-cyan-400 hover:text-cyan-300"
                          title="编辑"
                        >
                          ✏️
                        </a>
                        <button 
                          className="p-1 text-red-400 hover:text-red-300"
                          title="删除"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-right">
            <a href="/admin/games" className="text-cyan-400 hover:text-cyan-300">
              查看全部游戏 →
            </a>
          </div>
        </div>
        
        {/* 系统状态 */}
        <div className="bg-dark-200 border border-gray-700 rounded-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-cyber font-bold text-cyan-400 mb-4">系统状态</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-300 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium mb-2">存储空间</h3>
              <div className="w-full bg-dark-400 rounded-full h-4 mb-2">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-sm text-gray-400">使用量: 30% (3GB/10GB)</p>
            </div>
            
            <div className="bg-dark-300 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium mb-2">缓存状态</h3>
              <div className="text-green-400 font-bold mb-2">✓ 正常</div>
              <p className="text-sm text-gray-400">上次清理: 今天 08:30</p>
            </div>
            
            <div className="bg-dark-300 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium mb-2">系统版本</h3>
              <div className="font-bold mb-2">v1.2.0</div>
              <p className="text-sm text-gray-400">已是最新版本</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 