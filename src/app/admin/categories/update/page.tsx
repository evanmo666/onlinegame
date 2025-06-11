import type { Metadata } from 'next'
import { UpdateCategoriesContent } from '@/components/UpdateCategoriesContent'

export const metadata: Metadata = {
  title: '更新游戏分类 - OnlineGame.run',
  description: '批量管理和更新游戏分类',
  robots: 'noindex, nofollow', // 后台页面不被搜索引擎索引
}

export default function UpdateCategoriesPage() {
  return <UpdateCategoriesContent />
}