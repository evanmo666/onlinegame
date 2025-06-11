import type { Metadata } from 'next'
import { SettingsContent } from '@/components/SettingsContent'

export const metadata: Metadata = {
  title: '系统设置 - OnlineGame.run',
  description: '游戏平台系统设置',
  robots: 'noindex, nofollow', // 后台页面不被搜索引擎索引
}

export default function SettingsPage() {
  return <SettingsContent />
} 