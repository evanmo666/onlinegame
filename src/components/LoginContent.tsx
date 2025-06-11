"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LoginContent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 简单的验证
    if (!username || !password) {
      setError('请输入用户名和密码')
      return
    }
    
    setLoading(true)
    setError('')
    
    // 简单的模拟登录，实际项目中应使用安全的身份验证
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        // 实际项目中应使用安全的JWT或Session存储
        localStorage.setItem('admin_auth', 'true')
        router.push('/admin')
      } else {
        setError('用户名或密码错误')
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
      <div className="bg-dark-200 border border-gray-700 rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cyber font-bold gradient-text">管理员登录</h1>
          <p className="text-gray-400 mt-2">OnlineGame.run 管理后台</p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="username">
              用户名
            </label>
            <input
              id="username"
              type="text"
              className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
              placeholder="请输入管理员用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              密码
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full cyber-button py-3 text-center"
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>管理后台仅限授权人员访问</p>
          <p className="mt-2 text-xs">请联系系统管理员获取访问权限</p>
        </div>
      </div>
    </div>
  )
} 