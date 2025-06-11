import type { Metadata } from 'next'
import { GameFormContent } from '@/components/GameFormContent'

export const metadata: Metadata = {
  title: '编辑游戏 - OnlineGame.run',
  description: '编辑游戏信息',
  robots: 'noindex, nofollow', // 后台页面不被搜索引擎索引
}

export default function EditGamePage() {
  return <GameFormContent mode="edit" />
} 