import type { Metadata } from 'next'
import { LoginContent } from '@/components/LoginContent'

export const metadata: Metadata = {
  title: '管理员登录 - OnlineGame.run',
  description: '管理员登录页面',
  robots: 'noindex, nofollow', // 后台页面不被搜索引擎索引
}

export default function LoginPage() {
  return <LoginContent />
} 