"use client"

import { useState, useEffect } from 'react'
import { Search, Save, Filter, Tag, Check, X } from 'lucide-react'
import { getGameCategories, getAllGames } from '@/lib/games'
import type { Game, GameCategory } from '@/types/game'
import { AdminLayout } from './AdminLayout'

// 游戏项组件
function GameItem({ 
  game, 
  categories, 
  onCategoryChange 
}: { 
  game: Game, 
  categories: GameCategory[], 
  onCategoryChange: (gameTitle: string, category: string) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(game.category.replace(/^\/|\/$/g, ''))
  
  const handleSave = () => {
    onCategoryChange(game.title, selectedCategory)
    setIsEditing(false)
  }
  
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-700 hover:bg-dark-300/50 transition-colors">
      <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={game.localThumbnail ? `/improved-game-data/images/${game.localThumbnail}` : game.thumbnail} 
          alt={game.title} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-white">{game.title}</h3>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-dark-300 border border-gray-700 rounded text-sm p-1 text-white"
            >
              {categories.filter(cat => cat.slug !== 'all').map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            <button 
              onClick={handleSave}
              className="p-1 text-green-500 hover:bg-dark-200 rounded"
            >
              <Check size={16} />
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="p-1 text-red-500 hover:bg-dark-200 rounded"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 text-sm text-gray-400">
              <span>{game.categoryIcon || getCategoryIcon(selectedCategory)}</span>
              <span>{game.categoryName || selectedCategory}</span>
            </span>
            <button 
              onClick={() => setIsEditing(true)}
              className="text-xs text-cyan-400 hover:text-cyan-300 ml-2"
            >
              Change
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// 获取分类图标（备用函数）
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'action': '⚔️',
    'adventure': '🗺️',
    'puzzle': '🧩',
    'racing': '🏎️',
    'sports': '⚽',
    'shooting': '🔫',
    'strategy': '🧠',
    'arcade': '🕹️',
    'multiplayer': '👥',
    'simulation': '🎯',
    'platformer': '🏃',
    'battle-royale': '🏆',
    'fighting': '👊',
    'idle': '👆',
    'word': '📝',
    'board': '🎲',
    'fishing': '🎣',
    'io-games': '🌐',
    'casual': '🎪',
    'kids': '👶',
    'drawing': '🎨',
    'vehicle-simulator': '🚗',
    'job-simulator': '👨‍💼',
    'horror': '👻',
    'survival': '🏕️',
    'fashion': '👗',
    'classic': '🕹️',
    'music': '🎵',
  };
  
  return icons[category.toLowerCase()] || '🎮';
}

// 分类统计组件
function CategoryStats({ 
  categories, 
  games,
  onBulkUpdate 
}: { 
  categories: GameCategory[], 
  games: Game[],
  onBulkUpdate: (oldCategory: string, newCategory: string) => void 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [targetCategory, setTargetCategory] = useState('')
  
  // 计算每个分类的游戏数量
  const getCategoryGameCount = (slug: string): number => {
    return games.filter(game => 
      game.category.replace(/^\/|\/$/g, '') === slug
    ).length
  }
  
  // 处理批量更新
  const handleBulkUpdate = () => {
    if (selectedCategory && targetCategory) {
      onBulkUpdate(selectedCategory, targetCategory)
      setIsModalOpen(false)
      setSelectedCategory('')
      setTargetCategory('')
    }
  }
  
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">分类统计</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-sm bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded transition-colors"
          >
            <Filter size={16} />
            <span>批量修改分类</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.filter(cat => cat.slug !== 'all').map((category) => {
            const gameCount = getCategoryGameCount(category.slug)
            return (
              <div 
                key={category.slug}
                className="bg-dark-300 border border-gray-700 rounded-lg p-4 hover:border-cyan-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium text-white">{category.name}</span>
                  </div>
                  <span className="bg-dark-400 text-gray-400 text-xs px-2 py-1 rounded-full">
                    {gameCount}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* 批量修改模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-300 border border-gray-700 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">批量修改游戏分类</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">源分类</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-dark-400 border border-gray-700 rounded p-2 text-white"
              >
                <option value="">选择要修改的分类</option>
                {categories.filter(cat => cat.slug !== 'all').map((category) => {
                  const gameCount = getCategoryGameCount(category.slug)
                  return (
                    <option key={category.slug} value={category.slug}>
                      {category.icon} {category.name} ({gameCount} 个游戏)
                    </option>
                  )
                })}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-1">目标分类</label>
              <select 
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full bg-dark-400 border border-gray-700 rounded p-2 text-white"
              >
                <option value="">选择新分类</option>
                {categories.filter(cat => cat.slug !== 'all' && cat.slug !== selectedCategory).map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-dark-400 hover:bg-dark-200 text-gray-300 rounded transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleBulkUpdate}
                disabled={!selectedCategory || !targetCategory}
                className={`
                  px-4 py-2 rounded flex items-center gap-2 transition-colors
                  ${(!selectedCategory || !targetCategory) 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  }
                `}
              >
                <Save size={16} />
                <span>保存更改</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function UpdateCategoriesContent() {
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<GameCategory[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentCategory, setCurrentCategory] = useState('all')
  const [message, setMessage] = useState({ type: '', text: '' })

  // 加载数据
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        // 获取分类和游戏数据
        const categoriesData = getGameCategories()
        const gamesData = getAllGames()
        
        setCategories(categoriesData)
        setGames(gamesData)
        setFilteredGames(gamesData)
      } catch (error) {
        console.error('加载游戏数据出错:', error)
        setMessage({ type: 'error', text: '加载数据时发生错误' })
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  // 过滤游戏
  useEffect(() => {
    if (!games.length) return
    
    let result = [...games]
    
    // 根据分类过滤
    if (currentCategory !== 'all') {
      result = result.filter(game => 
        game.category.replace(/^\/|\/$/g, '') === currentCategory
      )
    }
    
    // 根据搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(game => 
        game.title.toLowerCase().includes(query) ||
        (game.categoryName && game.categoryName.toLowerCase().includes(query))
      )
    }
    
    setFilteredGames(result)
  }, [games, currentCategory, searchQuery])

  // 处理分类变化
  const handleCategoryFilter = (category: string) => {
    setCurrentCategory(category)
  }

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 搜索逻辑已通过 useEffect 处理
  }

  // 修改单个游戏分类
  const handleCategoryChange = (gameTitle: string, newCategory: string) => {
    const updatedGames = games.map(game => 
      game.title === gameTitle 
        ? { 
            ...game, 
            category: `/${newCategory}/`,
            categoryName: categories.find(c => c.slug === newCategory)?.name || '',
            categoryIcon: categories.find(c => c.slug === newCategory)?.icon || ''
          } 
        : game
    )
    
    setGames(updatedGames)
    setFilteredGames(
      filteredGames.map(game => 
        game.title === gameTitle 
          ? { 
              ...game, 
              category: `/${newCategory}/`,
              categoryName: categories.find(c => c.slug === newCategory)?.name || '',
              categoryIcon: categories.find(c => c.slug === newCategory)?.icon || ''
            } 
          : game
      )
    )
    
    setMessage({ type: 'success', text: `已将 "${gameTitle}" 的分类更改为 "${newCategory}"` })
    
    // 清除消息
    setTimeout(() => {
      setMessage({ type: '', text: '' })
    }, 3000)
  }

  // 批量修改分类
  const handleBulkUpdate = (oldCategory: string, newCategory: string) => {
    const categoryName = categories.find(c => c.slug === newCategory)?.name || ''
    const categoryIcon = categories.find(c => c.slug === newCategory)?.icon || ''
    
    // 统计要更新的游戏数量
    const gamesToUpdate = games.filter(game => 
      game.category.replace(/^\/|\/$/g, '') === oldCategory
    ).length
    
    // 更新游戏
    const updatedGames = games.map(game => 
      game.category.replace(/^\/|\/$/g, '') === oldCategory
        ? { 
            ...game, 
            category: `/${newCategory}/`,
            categoryName,
            categoryIcon
          } 
        : game
    )
    
    setGames(updatedGames)
    setFilteredGames(
      filteredGames.map(game => 
        game.category.replace(/^\/|\/$/g, '') === oldCategory
          ? { 
              ...game, 
              category: `/${newCategory}/`,
              categoryName,
              categoryIcon
            } 
          : game
      )
    )
    
    // 显示成功消息
    const oldCategoryName = categories.find(c => c.slug === oldCategory)?.name || oldCategory
    const newCategoryName = categories.find(c => c.slug === newCategory)?.name || newCategory
    
    setMessage({ 
      type: 'success', 
      text: `已将 ${gamesToUpdate} 个游戏从 "${oldCategoryName}" 分类更改为 "${newCategoryName}"` 
    })
    
    // 清除消息
    setTimeout(() => {
      setMessage({ type: '', text: '' })
    }, 5000)
  }

  // 保存所有更改
  const handleSaveAll = () => {
    // 在实际项目中，这里应该调用API将更改保存到服务器
    setMessage({ type: 'success', text: '所有更改已保存到本地存储' })
    
    // 在浏览器中模拟保存
    try {
      localStorage.setItem('gameCategories', JSON.stringify(games))
      console.log('已保存游戏分类到本地存储')
    } catch (error) {
      console.error('保存到本地存储失败:', error)
    }
    
    // 清除消息
    setTimeout(() => {
      setMessage({ type: '', text: '' })
    }, 3000)
  }

  return (
    <AdminLayout>
      <div className="container p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">游戏分类管理</h1>
          
          <button 
            onClick={handleSaveAll}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            <Save size={18} />
            <span>保存所有更改</span>
          </button>
        </div>
        
        {/* 消息提示 */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
            message.type === 'error' 
              ? 'bg-red-500/20 border border-red-500 text-red-400' 
              : 'bg-green-500/20 border border-green-500 text-green-400'
          }`}>
            <span>{message.text}</span>
            <button 
              onClick={() => setMessage({ type: '', text: '' })}
              className="text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        {/* 分类统计 */}
        <CategoryStats 
          categories={categories} 
          games={games}
          onBulkUpdate={handleBulkUpdate}
        />
        
        {/* 搜索和过滤 */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索游戏..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-300 border border-gray-700 rounded-lg p-3 pl-10 text-white"
              />
              <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
            </form>
          </div>
          
          <div className="lg:w-1/3">
            <select
              value={currentCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="w-full bg-dark-300 border border-gray-700 rounded-lg p-3 text-white appearance-none"
            >
              <option value="all">所有分类</option>
              {categories.filter(cat => cat.slug !== 'all').map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* 游戏列表 */}
        <div className="bg-dark-200 border border-gray-700 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center">
              <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
              <p className="text-gray-400">加载游戏数据中...</p>
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="max-h-[600px] overflow-y-auto">
              {filteredGames.map((game) => (
                <GameItem 
                  key={game.title} 
                  game={game} 
                  categories={categories}
                  onCategoryChange={handleCategoryChange}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="text-5xl mb-4">🎮</div>
              <p className="text-gray-400 mb-2">没有找到符合条件的游戏</p>
              <p className="text-gray-500 text-sm">
                尝试更改搜索条件或选择不同的分类
              </p>
            </div>
          )}
        </div>
        
        {/* 分页信息 */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          显示 {filteredGames.length} 个游戏 (共 {games.length} 个)
        </div>
      </div>
    </AdminLayout>
  )
}