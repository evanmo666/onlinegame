import type { Metadata } from 'next'
import { AdminContent } from '@/components/AdminContent'

export const metadata: Metadata = {
  title: '管理后台 - OnlineGame.run',
  description: '游戏平台管理后台',
  robots: 'noindex, nofollow', // 后台页面不被搜索引擎索引
}

export default function AdminPage() {
  return <AdminContent />
} 