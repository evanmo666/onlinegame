import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-400/95 border-t border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 网站信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🎮</span>
              </div>
              <div>
                <h3 className="text-xl font-cyber font-bold text-white">
                  OnlineGame<span className="text-cyan-400">.run</span>
                </h3>
                <p className="text-sm text-gray-400">Free Gaming Platform</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Discover and play thousands of free online games instantly in your browser. 
              From action-packed adventures to mind-bending puzzles, we have something for every gamer.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-cyan-400 font-cyber font-semibold">🚀 Free to Play</span>
              <span className="text-cyan-400 font-cyber font-semibold">⚡ Instant Access</span>
              <span className="text-cyan-400 font-cyber font-semibold">📱 Cross Platform</span>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-lg font-cyber font-semibold text-cyan-400 mb-4">Quick Links</h4>
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <Link href="/?category=all" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                All Games
              </Link>
              <Link href="/admin/games" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Admin Panel
              </Link>
              <Link href="/admin/categories" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Categories Admin
              </Link>
            </nav>
          </div>

          {/* 游戏分类 */}
          <div>
            <h4 className="text-lg font-cyber font-semibold text-cyan-400 mb-4">Popular Categories</h4>
            <nav className="space-y-3">
              <Link href="/?category=action" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                ⚔️ Action Games
              </Link>
              <Link href="/?category=puzzle" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                🧩 Puzzle Games
              </Link>
              <Link href="/?category=racing" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                🏎️ Racing Games
              </Link>
              <Link href="/?category=adventure" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                🗺️ Adventure Games
              </Link>
              <Link href="/?category=shooting" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                🔫 Shooting Games
              </Link>
            </nav>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} OnlineGame.run. All rights reserved. 
              Free online games platform for everyone.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-400">
                Made with ❤️ for game lovers
              </span>
            </div>
          </div>

          {/* 技术信息 */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Built with Next.js 15 | Powered by modern web technologies | 
              Optimized for performance and accessibility
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 