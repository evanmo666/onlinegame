"use client"

import { useState, useEffect } from 'react'
import { getGameCategories, getAllGames } from '@/lib/games'
import type { GameCategory } from '@/types/game'
import { AdminLayout } from './AdminLayout'

export function CategoriesContent() {
  const [categories, setCategories] = useState<GameCategory[]>([])
  const [games, setGames] = useState<Record<string, number>>({}) // 每个分类下的游戏数量
  const [isLoading, setIsLoading] = useState(true)
  const [newCategory, setNewCategory] = useState('')
  const [editCategory, setEditCategory] = useState<{id: string, name: string} | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        // 获取分类和游戏数据
        const categoriesData = getGameCategories()
        const gamesData = getAllGames()
        
        // 过滤掉"All Games"分类
        const filteredCategories = categoriesData.filter(cat => cat.slug !== 'all')
        setCategories(filteredCategories)
        
        // 计算每个分类下的游戏数量
        const gameCountByCategory: Record<string, number> = {}
        gamesData.forEach(game => {
          const category = game.category.replace(/^\/|\/$/g, '')
          if (category) {
            const mainCategory = category.split('/')[0]
            gameCountByCategory[mainCategory] = (gameCountByCategory[mainCategory] || 0) + 1
          }
        })
        setGames(gameCountByCategory)
      } catch (error) {
        console.error('加载分类数据出错:', error)
        setError('加载数据时发生错误')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  // 添加新分类
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      setError('分类名称不能为空')
      return
    }

    // 检查分类名称是否已存在
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      setError('该分类已存在')
      return
    }

    // 创建新分类对象
    const slug = newCategory.toLowerCase().replace(/\s+/g, '-')
    const newCategoryObj: GameCategory = {
      name: newCategory,
      slug,
      count: 0
    }

    // 添加到列表中
    setCategories([...categories, newCategoryObj])
    setNewCategory('')
    setError('')
    
    // 实际项目中，这里应该调用API保存到后端
    alert('新分类添加成功！')
  }

  // 保存编辑的分类
  const handleSaveCategory = () => {
    if (!editCategory) return
    
    if (!editCategory.name.trim()) {
      setError('分类名称不能为空')
      return
    }

    // 检查是否与其他分类重名
    if (categories.some(cat => 
      cat.slug !== editCategory.id && 
      cat.name.toLowerCase() === editCategory.name.toLowerCase()
    )) {
      setError('该分类名称已存在')
      return
    }

    // 更新分类
    setCategories(categories.map(cat => 
      cat.slug === editCategory.id 
        ? {
            ...cat,
            name: editCategory.name,
            // 在实际项目中，如果需要更新slug，应该更新所有使用该分类的游戏
            // slug: editCategory.name.toLowerCase().replace(/\s+/g, '-')
          }
        : cat
    ))
    
    setEditCategory(null)
    setError('')
    
    // 实际项目中，这里应该调用API保存到后端
    alert('分类更新成功！')
  }

  // 删除分类
  const handleDeleteCategory = (slug: string) => {
    // 检查分类下是否有游戏
    if (games[slug]) {
      if (!confirm(`该分类下有 ${games[slug]} 个游戏，删除分类将导致这些游戏没有分类。确定要删除吗？`)) {
        return
      }
    } else {
      if (!confirm('确定要删除该分类吗？')) {
        return
      }
    }

    // 从列表中移除
    setCategories(categories.filter(cat => cat.slug !== slug))
    
    // 实际项目中，这里应该调用API保存到后端
    alert('分类删除成功！')
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
      <h1 className="text-3xl font-cyber font-bold text-white mb-6">分类管理</h1>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {/* 添加新分类 */}
      <div className="bg-dark-200 border border-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-cyber font-bold text-cyan-400 mb-4">添加新分类</h2>
        
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-grow bg-dark-300 border border-gray-700 rounded p-3 text-white"
            placeholder="输入新分类名称"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <button
            className="cyber-button py-2 px-4"
            onClick={handleAddCategory}
          >
            添加分类
          </button>
        </div>
      </div>
      
      {/* 分类列表 */}
      <div className="bg-dark-200 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-dark-300 border-b border-gray-700">
                <th className="p-4 text-left">分类名称</th>
                <th className="p-4 text-left">标识符</th>
                <th className="p-4 text-left">游戏数量</th>
                <th className="p-4 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.slug} className="border-b border-gray-700">
                    <td className="p-4">
                      {editCategory && editCategory.id === category.slug ? (
                        <input
                          type="text"
                          className="w-full bg-dark-300 border border-gray-700 rounded p-2 text-white"
                          value={editCategory.name}
                          onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveCategory()}
                          autoFocus
                        />
                      ) : (
                        <span className="font-medium">{category.name}</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-400">
                      {category.slug}
                    </td>
                    <td className="p-4">
                      {games[category.slug] || 0} 个游戏
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {editCategory && editCategory.id === category.slug ? (
                          <>
                            <button 
                              className="cyber-button-sm py-1 px-2"
                              onClick={handleSaveCategory}
                            >
                              保存
                            </button>
                            <button 
                              className="cyber-button-sm py-1 px-2 bg-gray-700"
                              onClick={() => {
                                setEditCategory(null)
                                setError('')
                              }}
                            >
                              取消
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="cyber-button-sm py-1 px-2"
                              onClick={() => setEditCategory({
                                id: category.slug,
                                name: category.name
                              })}
                            >
                              编辑
                            </button>
                            <button 
                              className="cyber-button-sm py-1 px-2 bg-red-900 hover:bg-red-800"
                              onClick={() => handleDeleteCategory(category.slug)}
                            >
                              删除
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-400">
                    没有找到任何分类
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分类说明 */}
      <div className="mt-6 bg-dark-300 border border-gray-700 rounded-lg p-4">
        <h3 className="font-medium mb-2">注意事项</h3>
        <ul className="text-gray-400 list-disc pl-5 space-y-1">
          <li>分类名称应简洁明了，反映游戏的类型或主题</li>
          <li>删除分类不会删除分类下的游戏，但这些游戏将变为未分类状态</li>
          <li>建议在删除分类前先将该分类下的游戏移动到其他分类</li>
        </ul>
      </div>
    </AdminLayout>
  )
} 