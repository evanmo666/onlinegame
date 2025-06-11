import type { Metadata } from 'next'
import { GamesContent } from '@/components/GamesContent'

export const metadata: Metadata = {
  title: '游戏管理 - OnlineGame.run',
  description: '管理游戏内容',
  robots: 'noindex, nofollow', // 后台页面不被搜索引擎索引
}

export default function GamesPage() {
  return <GamesContent />
} 