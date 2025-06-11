import type { Metadata } from 'next'
import { GameFormContent } from '@/components/GameFormContent'

export const metadata: Metadata = {
  title: '添加游戏 - OnlineGame.run',
  description: '添加新游戏到平台',
  robots: 'noindex, nofollow', // 后台页面不被搜索引擎索引
}

export default function AddGamePage() {
  return <GameFormContent mode="add" />
} 