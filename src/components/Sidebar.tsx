"use client"

import { X } from "lucide-react"
import type { GameCategory } from "@/types/game"

interface SidebarProps {
  categories: GameCategory[]
  currentCategory: string
  onCategoryChange: (category: string) => void
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ categories, currentCategory, onCategoryChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 
        w-64 h-screen bg-dark-400/95 backdrop-blur-sm border-r border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* 侧边栏头部 */}
          <div className="p-4 border-b border-gray-700 lg:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-cyber font-semibold text-cyan-400">Categories</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-dark-300 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* 分类列表 */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="hidden lg:block text-lg font-cyber font-semibold text-cyan-400 mb-6">
              Game Categories
            </h2>
            
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => {
                    onCategoryChange(category.slug)
                    onClose() // 移动端选择分类后关闭侧边栏
                  }}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-300
                    ${currentCategory === category.slug 
                      ? 'category-button active' 
                      : 'category-button'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${currentCategory === category.slug 
                      ? 'bg-cyan-400/20 text-cyan-400' 
                      : 'bg-gray-600 text-gray-400'
                    }
                  `}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 侧边栏底部信息 */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-cyan-400 font-cyber font-semibold text-lg mb-1">
                {categories.reduce((total, cat) => total + cat.count, 0)}
              </div>
              <div className="text-gray-400 text-sm">Total Games</div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Free online games platform
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Play instantly, no downloads!
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
} 