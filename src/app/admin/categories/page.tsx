import type { Metadata } from 'next'
import { CategoriesContent } from '@/components/CategoriesContent'

export const metadata: Metadata = {
  title: '分类管理 - OnlineGame.run',
  description: '管理游戏分类',
  robots: 'noindex, nofollow', // 后台页面不被搜索引擎索引
}

export default function CategoriesPage() {
  return <CategoriesContent />
} 