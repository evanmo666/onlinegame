"use client"

import { useState } from "react"
import { Menu, Search, X } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  onMenuClick: () => void
  onSearch: (query: string) => void
  searchQuery: string
}

export function Header({ onMenuClick, onSearch, searchQuery }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    onSearch(query)
  }

  return (
    <header className="sticky top-0 z-50 bg-dark-400/95 backdrop-blur-sm border-b border-gray-700">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧：菜单按钮和Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg bg-dark-300 hover:bg-dark-200 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={24} className="text-cyan-400" />
            </button>
            
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <div>
                <h1 className="text-xl font-cyber font-bold text-white">
                  OnlineGame<span className="text-cyan-400">.run</span>
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">Free Gaming Platform</p>
              </div>
            </Link>
          </div>

          {/* 右侧：搜索和导航 */}
          <div className="flex items-center gap-4">
            {/* 桌面搜索框 */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="search"
                  placeholder="Search games..."
                  defaultValue={searchQuery}
                  className="search-input pl-10 pr-4 py-2 w-80"
                />
              </div>
              <button
                type="submit"
                className="cyber-button px-4 py-2 text-sm"
              >
                Search
              </button>
            </form>

            {/* 移动端搜索按钮 */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg bg-dark-300 hover:bg-dark-200 transition-colors"
              aria-label="Toggle search"
            >
              {isSearchOpen ? <X size={24} className="text-cyan-400" /> : <Search size={24} className="text-cyan-400" />}
            </button>
          </div>
        </div>

        {/* 移动端搜索栏 */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="search"
                  placeholder="Search games..."
                  defaultValue={searchQuery}
                  className="search-input pl-10 pr-4 py-3 w-full"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="cyber-button px-6 py-3"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
} 