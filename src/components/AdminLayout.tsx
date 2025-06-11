"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 检查用户是否已登录
    const auth = localStorage.getItem('admin_auth')
    if (auth !== 'true') {
      router.push('/admin/login')
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="loading-spinner w-16 h-16"></div>
      </div>
    )
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col md:flex-row">
      {/* 移动端菜单按钮 */}
      <div className="md:hidden bg-dark-300 border-b border-gray-700 p-4 flex justify-between items-center">
        <h1 className="text-xl font-cyber font-bold gradient-text">管理后台</h1>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 rounded border border-gray-700"
        >
          {isMobileSidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 侧边栏 */}
      <div 
        className={`
          ${isMobileSidebarOpen ? 'block' : 'hidden'} 
          md:block bg-dark-300 w-full md:w-64 border-r border-gray-700 flex-shrink-0
        `}
      >
        <div className="p-4 border-b border-gray-700 hidden md:block">
          <h1 className="text-xl font-cyber font-bold gradient-text">OnlineGame.run</h1>
          <p className="text-gray-400 text-sm">管理后台</p>
        </div>

        <nav className="p-2">
          <div className="mb-2 px-3 py-2 text-gray-400 text-xs uppercase tracking-wider">主要功能</div>
          
          <a 
            href="/admin" 
            className={`block px-3 py-2 rounded mb-1 transition-colors ${
              isActive('/admin') && !isActive('/admin/games') && !isActive('/admin/categories')
                ? 'bg-cyan-800/30 text-cyan-400 border-l-2 border-cyan-400'
                : 'hover:bg-dark-200'
            }`}
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            📊 控制面板
          </a>
          
          <a 
            href="/admin/games" 
            className={`block px-3 py-2 rounded mb-1 transition-colors ${
              isActive('/admin/games')
                ? 'bg-cyan-800/30 text-cyan-400 border-l-2 border-cyan-400'
                : 'hover:bg-dark-200'
            }`}
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            🎮 游戏管理
          </a>
          
          <a 
            href="/admin/categories" 
            className={`block px-3 py-2 rounded mb-1 transition-colors ${
              isActive('/admin/categories')
                ? 'bg-cyan-800/30 text-cyan-400 border-l-2 border-cyan-400'
                : 'hover:bg-dark-200'
            }`}
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            🗂️ 分类管理
          </a>
          
          <div className="mb-2 mt-6 px-3 py-2 text-gray-400 text-xs uppercase tracking-wider">系统</div>
          
          <a 
            href="/admin/settings" 
            className={`block px-3 py-2 rounded mb-1 transition-colors ${
              isActive('/admin/settings')
                ? 'bg-cyan-800/30 text-cyan-400 border-l-2 border-cyan-400'
                : 'hover:bg-dark-200'
            }`}
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            ⚙️ 系统设置
          </a>
          
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded mb-1 hover:bg-dark-200 transition-colors text-red-400"
          >
            🚪 退出登录
          </button>
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="flex-grow overflow-auto">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
} 