"use client"

import { useState, useEffect } from 'react'
import { getAllGames, getGameCategories } from '@/lib/games'
import type { Game, GameCategory } from '@/types/game'
import { AdminLayout } from './AdminLayout'

export function GamesContent() {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGames, setSelectedGames] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [allCategories, setAllCategories] = useState<GameCategory[]>([])
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCategoryForBatch, setNewCategoryForBatch] = useState('')
  const gamesPerPage = 20

  useEffect(() => {
    async function loadGames() {
      try {
        setIsLoading(true)
        const gamesData = getAllGames()
        const categoriesData = getGameCategories()
        
        setGames(gamesData)
        setFilteredGames(gamesData)
        // 过滤掉'All Games'分类
        setAllCategories(categoriesData.filter(cat => cat.slug !== 'all'))
      } catch (error) {
        console.error('加载游戏数据出错:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadGames()
  }, [])

  // 筛选游戏
  useEffect(() => {
    let result = games

    // 按分类筛选
    if (selectedCategory !== 'all') {
      result = result.filter(game => 
        game.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    // 按搜索关键词筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(game => 
        game.title.toLowerCase().includes(query)
      )
    }

    setFilteredGames(result)
    setCurrentPage(1) // 重置页码
  }, [searchQuery, selectedCategory, games])

  // 获取唯一分类列表
  const categories = ['all', ...new Set(games.map(game => {
    const category = game.category.replace(/^\/|\/$/g, '')
    return category.split('/')[0]
  }))]

  // 分页逻辑
  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame)
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage)

  // 选择/取消选择游戏
  const toggleGameSelection = (title: string) => {
    setSelectedGames(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    )
  }

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedGames.length === currentGames.length) {
      setSelectedGames([])
    } else {
      setSelectedGames(currentGames.map(game => game.title))
    }
  }

  // 批量操作
  const handleBatchAction = (action: 'delete' | 'category') => {
    if (selectedGames.length === 0) {
      alert('请至少选择一个游戏')
      return
    }

    if (action === 'delete') {
      if (confirm(`确定要删除选中的 ${selectedGames.length} 个游戏吗？`)) {
        // 执行删除操作（实际实现中应与后端API交互）
        alert('删除功能未实现')
      }
    } else if (action === 'category') {
      setShowCategoryModal(true)
    }
  }
  
  // 执行批量修改分类
  const handleBatchUpdateCategory = () => {
    if (!newCategoryForBatch) {
      alert('请选择分类')
      return
    }
    
    // 在实际应用中，这里应该调用API更新数据库
    // 这里仅作示范，显示一条消息
    alert(`已将 ${selectedGames.length} 个游戏的分类修改为 ${newCategoryForBatch}`)
    
    // 关闭模态框并重置选择
    setShowCategoryModal(false)
    setNewCategoryForBatch('')
    setSelectedGames([])
  }

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-cyber font-bold text-white">游戏管理</h1>
        <a 
          href="/admin/games/add" 
          className="cyber-button py-2 px-4"
        >
          添加新游戏
        </a>
      </div>

      {/* 筛选工具栏 */}
      <div className="bg-dark-200 border border-gray-700 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="搜索游戏名称..."
              className="w-full bg-dark-300 border border-gray-700 rounded p-2 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-shrink-0">
            <select
              className="bg-dark-300 border border-gray-700 rounded p-2 text-white min-w-[180px]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">所有分类</option>
              {categories.filter(c => c !== 'all').map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-shrink-0">
            <span className="text-gray-400">
              共 {filteredGames.length} 个游戏
            </span>
          </div>
        </div>
      </div>

      {/* 批量操作 */}
      {selectedGames.length > 0 && (
        <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-4 mb-6 flex items-center justify-between">
          <span>已选择 {selectedGames.length} 个游戏</span>
          <div className="flex gap-2">
            <button 
              className="cyber-button-sm py-1 px-3 bg-red-900 hover:bg-red-800"
              onClick={() => handleBatchAction('delete')}
            >
              批量删除
            </button>
            <button 
              className="cyber-button-sm py-1 px-3"
              onClick={() => handleBatchAction('category')}
            >
              设置分类
            </button>
            <button 
              className="cyber-button-sm py-1 px-3"
              onClick={() => setSelectedGames([])}
            >
              取消选择
            </button>
          </div>
        </div>
      )}
      
      {/* 分类选择模态框 */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-dark-200 border border-cyan-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-cyber font-bold text-cyan-400 mb-4">设置游戏分类</h3>
            
            <p className="mb-4 text-gray-300">为 {selectedGames.length} 个游戏设置新分类</p>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">选择分类</label>
              <select
                className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                value={newCategoryForBatch}
                onChange={(e) => setNewCategoryForBatch(e.target.value)}
              >
                <option value="">请选择分类</option>
                {allCategories.map(category => (
                  <option key={category.slug} value={category.slug}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                className="cyber-button-sm py-2 px-4 bg-gray-700"
                onClick={() => {
                  setShowCategoryModal(false)
                  setNewCategoryForBatch('')
                }}
              >
                取消
              </button>
              <button 
                className="cyber-button-sm py-2 px-4"
                onClick={handleBatchUpdateCategory}
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 游戏列表 */}
      <div className="bg-dark-200 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-dark-300 border-b border-gray-700">
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedGames.length === currentGames.length && currentGames.length > 0}
                    onChange={toggleSelectAll}
                    className="mr-2"
                  />
                </th>
                <th className="p-3 text-left">游戏</th>
                <th className="p-3 text-left">分类</th>
                <th className="p-3 text-left">游戏URL</th>
                <th className="p-3 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {currentGames.length > 0 ? (
                currentGames.map((game) => (
                  <tr key={game.title} className="border-b border-gray-700 hover:bg-dark-300">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedGames.includes(game.title)}
                        onChange={() => toggleGameSelection(game.title)}
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-dark-300 rounded overflow-hidden">
                          <img 
                            src={`/improved-game-data/images/${game.localThumbnail}`}
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{game.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400">
                      {game.category.replace(/^\/|\/$/g, '')}
                    </td>
                    <td className="p-3 text-gray-400 max-w-[200px] truncate">
                      {game.url}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <a 
                          href={`/admin/games/edit/${encodeURIComponent(game.title)}`}
                          className="cyber-button-sm py-1 px-2"
                        >
                          编辑
                        </a>
                        <a 
                          href={`/game/${game.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          target="_blank"
                          className="cyber-button-sm py-1 px-2 bg-cyan-900/50"
                        >
                          查看
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    未找到符合条件的游戏
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分页控制 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            <button
              className="cyber-button-sm py-1 px-3"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              首页
            </button>
            <button
              className="cyber-button-sm py-1 px-3"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              上一页
            </button>
            
            <span className="flex items-center px-3 text-cyan-400">
              {currentPage} / {totalPages}
            </span>
            
            <button
              className="cyber-button-sm py-1 px-3"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              下一页
            </button>
            <button
              className="cyber-button-sm py-1 px-3"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              末页
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  )
} 