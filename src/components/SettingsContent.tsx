"use client"

import { useState, useEffect } from 'react'
import { AdminLayout } from './AdminLayout'

// 定义系统设置接口
interface SystemSettings {
  seo: {
    siteTitle: string
    siteDescription: string
    siteKeywords: string
    ogImage: string
    twitterHandle: string
    googleAnalyticsId: string
  }
  general: {
    siteName: string
    siteUrl: string
    contactEmail: string
    gamesPerPage: number
    enableCache: boolean
  }
  appearance: {
    primaryColor: string
    accentColor: string
    darkMode: boolean
    enableAnimations: boolean
  }
}

export function SettingsContent() {
  // 默认设置
  const defaultSettings: SystemSettings = {
    seo: {
      siteTitle: 'OnlineGame.run - 免费在线游戏平台',
      siteDescription: '免费在线游戏平台，无需下载，即点即玩，包含多种类型的游戏',
      siteKeywords: '在线游戏,免费游戏,浏览器游戏,HTML5游戏,小游戏,休闲游戏',
      ogImage: '/images/og-image.jpg',
      twitterHandle: '@onlinegamerun',
      googleAnalyticsId: 'G-XXXXXXXXXX'
    },
    general: {
      siteName: 'OnlineGame.run',
      siteUrl: 'https://www.onlinegame.run',
      contactEmail: 'contact@onlinegame.run',
      gamesPerPage: 24,
      enableCache: true
    },
    appearance: {
      primaryColor: '#00a8ff',
      accentColor: '#9c27b0',
      darkMode: true,
      enableAnimations: true
    }
  }

  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState<'seo' | 'general' | 'appearance'>('seo')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  // 模拟加载设置
  useEffect(() => {
    // 实际项目中，这里应该从后端API加载设置
    const loadSettings = async () => {
      try {
        setIsLoading(true)
        // 从本地存储中获取设置，如果没有则使用默认设置
        const savedSettings = localStorage.getItem('system_settings')
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings))
        }
      } catch (error) {
        console.error('加载设置失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  // 处理输入变化
  const handleInputChange = (
    section: 'seo' | 'general' | 'appearance',
    field: string,
    value: string | number | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // 保存设置
  const handleSaveSettings = async () => {
    try {
      setIsSaving(true)
      setSaveMessage('')

      // 实际项目中，这里应该调用API保存设置
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 保存到本地存储（仅用于演示）
      localStorage.setItem('system_settings', JSON.stringify(settings))
      
      setSaveMessage('设置已成功保存！')
      setShowSuccessToast(true)
      
      // 3秒后隐藏成功提示
      setTimeout(() => {
        setShowSuccessToast(false)
      }, 3000)
    } catch (error) {
      console.error('保存设置失败:', error)
      setSaveMessage('保存设置失败，请重试！')
    } finally {
      setIsSaving(false)
    }
  }

  // 重置为默认设置
  const handleResetSettings = () => {
    if (confirm('确定要将所有设置重置为默认值吗？此操作不可逆。')) {
      setSettings(defaultSettings)
      setSaveMessage('设置已重置为默认值，点击保存以应用更改。')
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="loading-spinner w-16 h-16 mx-auto mb-4"></div>
            <p className="text-cyan-400 font-cyber text-lg">加载设置中...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-cyber font-bold text-white">系统设置</h1>
          <p className="text-gray-400 mt-1">配置网站SEO和其他系统参数</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex gap-3">
          <button 
            className="cyber-button-sm bg-gray-700 py-2 px-4"
            onClick={handleResetSettings}
          >
            重置为默认
          </button>
          <button 
            className="cyber-button py-2 px-4"
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="loading-spinner w-5 h-5 mr-2"></span>
                保存中...
              </>
            ) : '保存设置'}
          </button>
        </div>
      </div>

      {/* 成功提示 */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 bg-green-900/90 border border-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <span className="text-green-300 mr-2">✓</span>
          {saveMessage}
        </div>
      )}
      
      {/* 设置标签页 */}
      <div className="bg-dark-200 border border-gray-700 rounded-lg overflow-hidden">
        <div className="border-b border-gray-700 flex">
          <button
            className={`px-6 py-4 font-medium ${
              activeTab === 'seo' 
                ? 'bg-cyan-900/30 text-cyan-400 border-b-2 border-cyan-400' 
                : 'hover:bg-dark-300'
            }`}
            onClick={() => setActiveTab('seo')}
          >
            SEO设置
          </button>
          <button
            className={`px-6 py-4 font-medium ${
              activeTab === 'general' 
                ? 'bg-cyan-900/30 text-cyan-400 border-b-2 border-cyan-400' 
                : 'hover:bg-dark-300'
            }`}
            onClick={() => setActiveTab('general')}
          >
            常规设置
          </button>
          <button
            className={`px-6 py-4 font-medium ${
              activeTab === 'appearance' 
                ? 'bg-cyan-900/30 text-cyan-400 border-b-2 border-cyan-400' 
                : 'hover:bg-dark-300'
            }`}
            onClick={() => setActiveTab('appearance')}
          >
            外观设置
          </button>
        </div>
        
        <div className="p-6">
          {/* SEO设置 */}
          {activeTab === 'seo' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full mb-2">
                <h3 className="text-xl font-cyber font-bold text-cyan-400 mb-4">搜索引擎优化(SEO)设置</h3>
                <p className="text-gray-400">这些设置将影响您网站在搜索引擎中的表现和社交媒体分享效果。</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="siteTitle">
                    网站标题 <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="siteTitle"
                    type="text"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.seo.siteTitle}
                    onChange={(e) => handleInputChange('seo', 'siteTitle', e.target.value)}
                    placeholder="OnlineGame.run - 免费在线游戏平台"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    网站在搜索结果中显示的标题，建议60个字符以内
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="siteDescription">
                    网站描述 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="siteDescription"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.seo.siteDescription}
                    onChange={(e) => handleInputChange('seo', 'siteDescription', e.target.value)}
                    placeholder="免费在线游戏平台，无需下载，即点即玩，包含多种类型的游戏"
                    rows={3}
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    网站在搜索结果中显示的描述，建议160个字符以内
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="siteKeywords">
                    关键词
                  </label>
                  <input
                    id="siteKeywords"
                    type="text"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.seo.siteKeywords}
                    onChange={(e) => handleInputChange('seo', 'siteKeywords', e.target.value)}
                    placeholder="在线游戏,免费游戏,浏览器游戏,HTML5游戏"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    用逗号分隔的关键词列表，有助于搜索引擎理解网站内容
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="ogImage">
                    社交媒体分享图片(OG Image)
                  </label>
                  <input
                    id="ogImage"
                    type="text"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.seo.ogImage}
                    onChange={(e) => handleInputChange('seo', 'ogImage', e.target.value)}
                    placeholder="/images/og-image.jpg"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    当网站在社交媒体上分享时显示的图片URL，建议尺寸1200x630像素
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="twitterHandle">
                    Twitter用户名
                  </label>
                  <input
                    id="twitterHandle"
                    type="text"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.seo.twitterHandle}
                    onChange={(e) => handleInputChange('seo', 'twitterHandle', e.target.value)}
                    placeholder="@onlinegamerun"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    您网站的Twitter账号，用于Twitter卡片显示
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="googleAnalyticsId">
                    Google Analytics ID
                  </label>
                  <input
                    id="googleAnalyticsId"
                    type="text"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.seo.googleAnalyticsId}
                    onChange={(e) => handleInputChange('seo', 'googleAnalyticsId', e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Google Analytics 跟踪ID，用于网站访问统计
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* 常规设置 */}
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full mb-2">
                <h3 className="text-xl font-cyber font-bold text-cyan-400 mb-4">常规设置</h3>
                <p className="text-gray-400">配置网站的基本信息和功能参数。</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="siteName">
                    网站名称 <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="siteName"
                    type="text"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.general.siteName}
                    onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                    placeholder="OnlineGame.run"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="siteUrl">
                    网站URL <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="siteUrl"
                    type="url"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.general.siteUrl}
                    onChange={(e) => handleInputChange('general', 'siteUrl', e.target.value)}
                    placeholder="https://www.onlinegame.run"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="contactEmail">
                    联系邮箱
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                    placeholder="contact@onlinegame.run"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="gamesPerPage">
                    每页显示游戏数量
                  </label>
                  <input
                    id="gamesPerPage"
                    type="number"
                    min="6"
                    max="100"
                    className="w-full bg-dark-300 border border-gray-700 rounded p-3 text-white"
                    value={settings.general.gamesPerPage}
                    onChange={(e) => handleInputChange('general', 'gamesPerPage', parseInt(e.target.value))}
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    游戏列表页面每页显示的游戏数量
                  </p>
                </div>
                
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.general.enableCache}
                      onChange={(e) => handleInputChange('general', 'enableCache', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">启用缓存</span>
                  </label>
                  <p className="text-gray-500 text-sm mt-1 ml-7">
                    启用缓存可以提高网站性能，但可能导致内容更新延迟显示
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* 外观设置 */}
          {activeTab === 'appearance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full mb-2">
                <h3 className="text-xl font-cyber font-bold text-cyan-400 mb-4">外观设置</h3>
                <p className="text-gray-400">自定义网站的视觉风格和用户体验。</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="primaryColor">
                    主题色
                  </label>
                  <div className="flex items-center">
                    <input
                      id="primaryColor"
                      type="color"
                      className="w-12 h-12 mr-3 border border-gray-700 rounded bg-dark-300 overflow-hidden"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-grow bg-dark-300 border border-gray-700 rounded p-3 text-white"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                      placeholder="#00a8ff"
                    />
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    网站主要颜色，用于按钮、链接和强调元素
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="accentColor">
                    辅助色
                  </label>
                  <div className="flex items-center">
                    <input
                      id="accentColor"
                      type="color"
                      className="w-12 h-12 mr-3 border border-gray-700 rounded bg-dark-300 overflow-hidden"
                      value={settings.appearance.accentColor}
                      onChange={(e) => handleInputChange('appearance', 'accentColor', e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-grow bg-dark-300 border border-gray-700 rounded p-3 text-white"
                      value={settings.appearance.accentColor}
                      onChange={(e) => handleInputChange('appearance', 'accentColor', e.target.value)}
                      placeholder="#9c27b0"
                    />
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    网站辅助颜色，用于次要元素和装饰
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.appearance.darkMode}
                      onChange={(e) => handleInputChange('appearance', 'darkMode', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">默认使用暗色模式</span>
                  </label>
                  <p className="text-gray-500 text-sm mt-1 ml-7">
                    设置网站默认使用暗色主题（推荐用于游戏网站）
                  </p>
                </div>
                
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.appearance.enableAnimations}
                      onChange={(e) => handleInputChange('appearance', 'enableAnimations', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">启用界面动画</span>
                  </label>
                  <p className="text-gray-500 text-sm mt-1 ml-7">
                    启用界面过渡动画和效果，可能影响性能
                  </p>
                </div>
              </div>
              
              <div className="col-span-full mt-4 p-4 bg-dark-300 rounded-lg border border-gray-700">
                <h4 className="font-medium mb-3">预览效果</h4>
                <div className="flex flex-wrap gap-4">
                  <div 
                    className="w-32 h-10 rounded flex items-center justify-center text-white"
                    style={{ backgroundColor: settings.appearance.primaryColor }}
                  >
                    主题色
                  </div>
                  <div 
                    className="w-32 h-10 rounded flex items-center justify-center text-white"
                    style={{ backgroundColor: settings.appearance.accentColor }}
                  >
                    辅助色
                  </div>
                  <div 
                    className="h-10 rounded flex items-center justify-center px-4 text-white"
                    style={{ 
                      backgroundColor: settings.appearance.primaryColor,
                      boxShadow: `0 0 10px ${settings.appearance.primaryColor}`
                    }}
                  >
                    按钮效果
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
} 