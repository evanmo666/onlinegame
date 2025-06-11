import { Game, GameContent, GameCategory } from '@/types/game';
import gamesSummary from '../../improved-game-data/games-summary.json';
// 导入分类定义
import categoriesData from '../data/categories.json';

// 获取所有游戏数据
export function getAllGames(): Game[] {
  return gamesSummary as Game[];
}

// 根据分类获取游戏
export function getGamesByCategory(category: string): Game[] {
  const games = getAllGames();
  if (category === 'all') return games;
  
  return games.filter(game => 
    game.category.toLowerCase().includes(`/${category.toLowerCase()}/`)
  );
}

// 搜索游戏
export function searchGames(query: string): Game[] {
  const games = getAllGames();
  const lowercaseQuery = query.toLowerCase();
  
  return games.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.category.toLowerCase().includes(lowercaseQuery) ||
    (game.categoryName && game.categoryName.toLowerCase().includes(lowercaseQuery))
  );
}

// 获取游戏分类
export function getGameCategories(): GameCategory[] {
  // 直接从分类数据文件加载分类
  if (categoriesData && Array.isArray(categoriesData) && categoriesData.length > 0) {
    const allGamesCount = getAllGames().length;
    
    // 添加"全部游戏"分类
    const categories: GameCategory[] = [
      { name: 'All Games', slug: 'all', count: allGamesCount, icon: '🎮' }
    ];
    
    // 添加其他分类
    categoriesData.forEach(category => {
      categories.push({
        name: category.name,
        slug: category.slug,
        count: category.count,
        icon: category.icon || getCategoryIcon(category.slug)
      });
    });
    
    return categories;
  }
  
  // 备用方案：从游戏数据中动态提取分类
  const games = getAllGames();
  const categoryMap = new Map<string, number>();
  
  games.forEach(game => {
    const category = game.category.replace(/^\//, '').replace(/\/$/, '');
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  });
  
  const categories: GameCategory[] = [
    { name: 'All Games', slug: 'all', count: games.length, icon: '🎮' }
  ];
  
  categoryMap.forEach((count, slug) => {
    categories.push({
      name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
      slug,
      count,
      icon: getCategoryIcon(slug)
    });
  });
  
  return categories.sort((a, b) => b.count - a.count);
}

// 获取分类图标
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'action': '⚔️',
    'adventure': '🗺️',
    'puzzle': '🧩',
    'racing': '🏎️',
    'sports': '⚽',
    'shooting': '🔫',
    'strategy': '🧠',
    'arcade': '🕹️',
    'multiplayer': '👥',
    'simulation': '🎯',
    'platformer': '🏃',
    'battle-royale': '🏆',
    'fighting': '👊',
    'idle': '👆',
    'word': '📝',
    'board': '🎲',
    'fishing': '🎣',
    'io-games': '🌐',
    'casual': '🎪',
    'kids': '👶',
    'drawing': '🎨',
    'vehicle-simulator': '🚗',
    'job-simulator': '👨‍💼',
    'horror': '👻',
    'survival': '🏕️',
    'fashion': '👗',
    'classic': '🕹️',
    'music': '🎵',
    'new-games': '🆕',
    'popular': '🔥'
  };
  
  return icons[category.toLowerCase()] || '🎮';
}

// 根据slug获取单个游戏
export function getGameBySlug(slug: string): Game | null {
  const games = getAllGames();
  return games.find(game => 
    game.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === slug.toLowerCase()
  ) || null;
}

// 获取相似游戏推荐
export function getSimilarGames(currentGame: Game, limit: number = 6): Game[] {
  const games = getAllGames();
  const similar = games
    .filter(game => 
      game.title !== currentGame.title && 
      game.category === currentGame.category
    )
    .slice(0, limit);
  
  // 如果同分类游戏不够，补充其他游戏
  if (similar.length < limit) {
    const additional = games
      .filter(game => 
        game.title !== currentGame.title && 
        !similar.includes(game)
      )
      .slice(0, limit - similar.length);
    
    similar.push(...additional);
  }
  
  return similar;
}

// 将游戏标题转换为URL slug
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-|-$/g, '');
}

// 从slug转换回标题匹配
export function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// 获取游戏缩略图路径
export function getGameThumbnailPath(game: Game): string {
  if (!game.localThumbnail) {
    return game.thumbnail; // 使用远程缩略图
  }
  
  return `/improved-game-data/images/${game.localThumbnail}`;
}

// 服务器端专用：获取游戏详细内容
export async function getGameContent(gameTitle: string): Promise<GameContent | null> {
  // 这个函数只能在服务器端使用
  if (typeof window !== 'undefined') {
    console.error("getGameContent 只能在服务器端使用");
    return null;
  }
  
  try {
    // 服务器端安全导入
    // 这种写法避免了客户端打包fs模块的问题
    const fs = require('fs');
    const path = require('path');
    
    const contentPath = path.join(process.cwd(), 'improved-game-data', 'content', `${gameTitle}.json`);
    
    // 检查文件是否存在
    if (!fs.existsSync(contentPath)) {
      return null;
    }
    
    const content = fs.readFileSync(contentPath, 'utf-8');
    return JSON.parse(content) as GameContent;
  } catch (error) {
    console.error('Error loading game content:', error);
    return null;
  }
} 