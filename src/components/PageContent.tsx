"use client"

import { useState, useEffect } from "react"
import { Search, Grid, List, ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { GameGrid } from "@/components/GameGrid"
import { GameList } from "@/components/GameList"
import { Footer } from "@/components/Footer"
import { getAllGames, getGameCategories, getGamesByCategory, searchGames } from "@/lib/games"
import type { Game, GameCategory } from "@/types/game"

// 每页显示的游戏数量
const GAMES_PER_PAGE = 36;

export function PageContent() {
  // 状态管理
  const [games, setGames] = useState<Game[]>([])
  const [categories, setCategories] = useState<GameCategory[]>([])
  const [currentCategory, setCurrentCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [displayedGames, setDisplayedGames] = useState<Game[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)

  // 初始化数据加载
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        
        // 加载游戏分类
        const categoriesData = getGameCategories()
        setCategories(categoriesData)
        
        // 加载所有游戏
        const gamesData = getAllGames()
        setGames(gamesData)
        
      } catch (error) {
        console.error('Error loading games data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  // 处理分类变化
  useEffect(() => {
    if (searchQuery) {
      // 如果有搜索查询，显示搜索结果
      const searchResults = searchGames(searchQuery)
      setGames(searchResults)
    } else {
      // 否则根据分类显示游戏
      const categoryGames = getGamesByCategory(currentCategory)
      setGames(categoryGames)
    }
    // 重置为第一页
    setCurrentPage(1)
  }, [currentCategory, searchQuery])
  
  // 分页处理
  useEffect(() => {
    if (games.length > 0) {
      // 计算总页数
      const pages = Math.ceil(games.length / GAMES_PER_PAGE)
      setTotalPages(pages)
      
      // 确保当前页不超出范围
      const validPage = Math.min(Math.max(1, currentPage), pages)
      if (validPage !== currentPage) {
        setCurrentPage(validPage)
      }
      
      // 计算当前页显示的游戏
      const startIndex = (validPage - 1) * GAMES_PER_PAGE
      const endIndex = Math.min(startIndex + GAMES_PER_PAGE, games.length)
      setDisplayedGames(games.slice(startIndex, endIndex))
    } else {
      setDisplayedGames([])
      setTotalPages(1)
    }
  }, [games, currentPage])

  // 处理搜索
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query) {
      setCurrentCategory('all') // 搜索时重置分类
    }
  }

  // 处理分类选择
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category)
    setSearchQuery('') // 选择分类时清空搜索
  }
  
  // 页面导航
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-16 h-16 mx-auto mb-4"></div>
          <p className="text-cyan-400 font-cyber text-lg">Loading Games...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* 顶部导航 */}
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <main className="flex">
        {/* 侧边栏 */}
        <Sidebar 
          categories={categories}
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* 主要内容区域 - 减少左边距到20px */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-[20px]`}>
          <div className="p-6">
            {/* 页面标题和控制栏 */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-cyber font-bold gradient-text mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : 
                 categories.find(cat => cat.slug === currentCategory)?.name || 'All Games'}
              </h1>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-400 text-lg">
                  {games.length} game{games.length !== 1 ? 's' : ''} available
                  {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                </p>
                
                {/* 视图切换按钮 */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-cyan-400 text-black' 
                        : 'bg-dark-300 text-gray-400 hover:text-cyan-400'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-cyan-400 text-black' 
                        : 'bg-dark-300 text-gray-400 hover:text-cyan-400'
                    }`}
                    aria-label="List view"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* 游戏展示区域 */}
            {displayedGames.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <GameGrid games={displayedGames} />
                ) : (
                  <GameList games={displayedGames} />
                )}
                
                {/* 分页控制 */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-3">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        currentPage === 1
                          ? 'bg-dark-300 text-gray-500 cursor-not-allowed'
                          : 'bg-dark-300 text-cyan-400 hover:bg-dark-200'
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {/* 显示页码 */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // 计算页码范围
                        let pageNum;
                        if (totalPages <= 5) {
                          // 总页数小于等于5，直接显示所有页码
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          // 当前页在前3页，显示1-5页
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          // 当前页在后3页，显示最后5页
                          pageNum = totalPages - 4 + i;
                        } else {
                          // 当前页在中间，显示当前页及其前后2页
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
                              currentPage === pageNum
                                ? 'bg-cyan-400 text-black'
                                : 'bg-dark-300 text-gray-300 hover:bg-dark-200 hover:text-cyan-400'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        currentPage === totalPages
                          ? 'bg-dark-300 text-gray-500 cursor-not-allowed'
                          : 'bg-dark-300 text-cyan-400 hover:bg-dark-200'
                      }`}
                      aria-label="Next page"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎮</div>
                <h2 className="text-2xl font-cyber text-gray-400 mb-2">
                  {searchQuery ? 'No games found' : 'No games in this category'}
                </h2>
                <p className="text-gray-500">
                  {searchQuery 
                    ? 'Try searching for something else or browse our categories'
                    : 'Check back later for new games in this category'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => handleSearch('')}
                    className="cyber-button mt-4"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 底部 */}
      <Footer />
    </div>
  )
} 