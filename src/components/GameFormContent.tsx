"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getAllGames, getGameCategories } from '@/lib/games'
import type { Game, GameCategory } from '@/types/game'
import { AdminLayout } from './AdminLayout'

interface GameFormContentProps {
  mode: 'add' | 'edit'
}

export function GameFormContent({ mode }: GameFormContentProps) {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(mode === 'edit')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<GameCategory[]>([])

  // 游戏表单数据
  const [formData, setFormData] = useState<Partial<Game>>({
    title: '',
    url: '',
    category: '',
    gameFrame: '',
    thumbnail: '',
    localThumbnail: '',
    hasControls: false,
    hasHowToPlay: false,
    hasTips: false,
    hasDeveloper: false,
    similarGamesCount: 0
  })

  // 本地上传的缩略图
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  // 加载游戏数据（编辑模式）
  useEffect(() => {
    async function loadData() {
      try {
        // 获取分类数据
        const categoriesData = getGameCategories()
        // 过滤掉"All Games"分类
        const filteredCategories = categoriesData.filter(cat => cat.slug !== 'all')
        setCategories(filteredCategories)

        // 编辑模式下加载游戏数据
        if (mode === 'edit' && params.title) {
          const gameTitle = decodeURIComponent(params.title as string)
          const games = getAllGames()
          const game = games.find(g => g.title === gameTitle)

          if (game) {
            setFormData({
              ...game,
              category: game.category.replace(/^\/|\/$/g, '')
            })
            // 如果有本地缩略图，设置预览
            if (game.localThumbnail) {
              setThumbnailPreview(`/improved-game-data/images/${game.localThumbnail}`)
            }
          } else {
            setError('找不到指定的游戏')
          }
        }
      } catch (error) {
        console.error('加载数据出错:', error)
        setError('加载数据时发生错误')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [mode, params])

  // 处理表单字段更改
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }))
  }

  // 处理缩略图上传
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      // 创建本地预览URL
      const previewUrl = URL.createObjectURL(file)
      setThumbnailPreview(previewUrl)
      
      // 设置localThumbnail字段，实际项目中应由后端处理
      const timestamp = Date.now()
      setFormData(prev => ({
        ...prev,
        localThumbnail: `${formData.title}_${timestamp}.jpg`
      }))
    }
  }

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 表单验证
    if (!formData.title || !formData.url || !formData.category || !formData.gameFrame) {
      setError('请填写所有必填字段')
      return
    }
    
    if (!thumbnailPreview && !formData.thumbnail) {
      setError('请上传游戏缩略图')
      return
    }
    
    try {
      setIsSaving(true)
      setError('')
      
      // 实际项目中应与后端API交互
      // 这里只是模拟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 成功后跳转回游戏列表
      alert(mode === 'add' ? '添加游戏成功！' : '游戏更新成功！')
      router.push('/admin/games')
    } catch (error) {
      console.error('保存游戏数据出错:', error)
      setError('保存数据时发生错误')
    } finally {
      setIsSaving(false)
    }
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
      <div className="mb-6">
        <h1 className="text-3xl font-cyber font-bold text-white">
          {mode === 'add' ? '添加新游戏' : '编辑游戏'}
        </h1>
        <p className="text-gray-400 mt-2">
          {mode === 'add' 
            ? '填写下面的表单添加新游戏到平台' 
            : '修改游戏信息并保存更改'}
        </p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-dark-200 border border-gray-700 rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 左侧列 - 基本信息 */}
            <div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="title">
                  游戏名称 <span className="text-red-400">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                  placeholder="输入游戏名称"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="category">
                  游戏分类 <span className="text-red-400">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">选择分类</option>
                  {categories.map(category => (
                    <option key={category.slug} value={category.slug}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <p className="text-gray-500 text-sm mt-1">选择游戏所属的分类</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="url">
                  游戏URL <span className="text-red-400">*</span>
                </label>
                <input
                  id="url"
                  name="url"
                  type="url"
                  className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                  placeholder="https://www.example.com/game"
                  value={formData.url}
                  onChange={handleChange}
                  required
                />
                <p className="text-gray-500 text-sm mt-1">游戏的原始URL地址</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="gameFrame">
                  游戏框架URL <span className="text-red-400">*</span>
                </label>
                <input
                  id="gameFrame"
                  name="gameFrame"
                  type="url"
                  className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                  placeholder="https://www.example.com/game/embed"
                  value={formData.gameFrame}
                  onChange={handleChange}
                  required
                />
                <p className="text-gray-500 text-sm mt-1">游戏的嵌入框架URL，用于iframe</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="thumbnail">
                  远程缩略图URL
                </label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                  placeholder="https://www.example.com/game/thumbnail.jpg"
                  value={formData.thumbnail || ''}
                  onChange={handleChange}
                />
                <p className="text-gray-500 text-sm mt-1">
                  可选：游戏缩略图的远程URL地址
                </p>
              </div>
            </div>

            {/* 右侧列 - 缩略图和其他设置 */}
            <div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">
                  本地缩略图
                </label>
                <div className="flex items-start space-x-4">
                  <div className="w-32 h-32 bg-dark-300 border border-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                    {thumbnailPreview ? (
                      <img 
                        src={thumbnailPreview} 
                        alt="游戏缩略图" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm text-center px-2">
                        暂无缩略图
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="cyber-button-sm py-2 px-4 cursor-pointer inline-block">
                      上传图片
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                    <p className="text-gray-500 text-sm mt-2">
                      推荐尺寸: 300x200 像素, JPG/PNG格式
                    </p>
                    {thumbnailFile && (
                      <p className="text-cyan-400 text-sm mt-1">
                        已选择: {thumbnailFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-3">游戏特性</label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="hasControls"
                      name="hasControls"
                      type="checkbox"
                      className="mr-3"
                      checked={formData.hasControls}
                      onChange={handleChange}
                    />
                    <label htmlFor="hasControls" className="text-gray-300">
                      游戏有控制说明
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="hasHowToPlay"
                      name="hasHowToPlay"
                      type="checkbox"
                      className="mr-3"
                      checked={formData.hasHowToPlay}
                      onChange={handleChange}
                    />
                    <label htmlFor="hasHowToPlay" className="text-gray-300">
                      游戏有玩法指南
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="hasTips"
                      name="hasTips"
                      type="checkbox"
                      className="mr-3"
                      checked={formData.hasTips}
                      onChange={handleChange}
                    />
                    <label htmlFor="hasTips" className="text-gray-300">
                      游戏有提示技巧
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="hasDeveloper"
                      name="hasDeveloper"
                      type="checkbox"
                      className="mr-3"
                      checked={formData.hasDeveloper}
                      onChange={handleChange}
                    />
                    <label htmlFor="hasDeveloper" className="text-gray-300">
                      显示开发者信息
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="similarGamesCount">
                  相似游戏数量
                </label>
                <input
                  id="similarGamesCount"
                  name="similarGamesCount"
                  type="number"
                  min="0"
                  max="10"
                  className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                  value={formData.similarGamesCount || 0}
                  onChange={handleChange}
                />
                <p className="text-gray-500 text-sm mt-1">
                  在游戏详情页显示的相似游戏推荐数量
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8 border-t border-gray-700 pt-6">
            <button
              type="button"
              className="cyber-button-sm bg-gray-700 py-2 px-4 mr-3"
              onClick={() => router.push('/admin/games')}
              disabled={isSaving}
            >
              取消
            </button>
            <button
              type="submit"
              className="cyber-button py-2 px-6"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="loading-spinner w-5 h-5 mr-2"></span>
                  正在保存...
                </>
              ) : (
                '保存游戏'
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
} 