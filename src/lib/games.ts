import { Game, GameContent, GameCategory } from '@/types/game';

// 动态导入游戏数据，添加错误处理
let gamesSummary: Game[] = [];
let categoriesData: any[] = [];

// 初始化游戏数据
async function initializeGameData() {
  try {
    // 动态导入游戏数据
    const gamesModule = await import('../../improved-game-data/games-summary.json');
    gamesSummary = (gamesModule.default || gamesModule) as Game[];
    
    // 动态导入分类数据
    const categoriesModule = await import('../data/categories.json');
    categoriesData = categoriesModule.default || categoriesModule;
  } catch (error) {
    console.error('Failed to load game data:', error);
    // 使用备用数据
    gamesSummary = [];
    categoriesData = [];
  }
}

// 同步版本的数据加载（用于服务器端渲染）
function loadGameDataSync(): Game[] {
  try {
    // 在服务器端同步加载数据
    if (typeof window === 'undefined') {
      const gamesData = require('../../improved-game-data/games-summary.json');
      return Array.isArray(gamesData) ? gamesData as Game[] : [];
    }
    return gamesSummary;
  } catch (error) {
    console.error('Failed to load game data synchronously:', error);
    return [];
  }
}

// 获取所有游戏数据
export function getAllGames(): Game[] {
  const games = loadGameDataSync();
  if (games.length === 0) {
    // 如果没有数据，初始化异步加载
    initializeGameData();
  }
  return games;
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
  try {
    // 尝试加载分类数据
    let categories: any[] = [];
    if (typeof window === 'undefined') {
      try {
        categories = require('../data/categories.json');
      } catch (error) {
        console.warn('Categories data not found, generating from games');
      }
    } else {
      categories = categoriesData;
    }
    
    // 如果有分类数据文件，使用它
    if (categories && Array.isArray(categories) && categories.length > 0) {
      const allGamesCount = getAllGames().length;
      
      // 添加"全部游戏"分类
      const gameCategories: GameCategory[] = [
        { name: 'All Games', slug: 'all', count: allGamesCount, icon: '🎮' }
      ];
      
      // 添加其他分类
      categories.forEach(category => {
        gameCategories.push({
          name: category.name,
          slug: category.slug,
          count: category.count,
          icon: category.icon || getCategoryIcon(category.slug)
        });
      });
      
      return gameCategories;
    }
  } catch (error) {
    console.warn('Error loading categories:', error);
  }
  
  // 备用方案：从游戏数据中动态提取分类
  const games = getAllGames();
  const categoryMap = new Map<string, number>();
  
  games.forEach(game => {
    const category = game.category.replace(/^\//, '').replace(/\/$/, '');
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  });
  
  const gameCategories: GameCategory[] = [
    { name: 'All Games', slug: 'all', count: games.length, icon: '🎮' }
  ];
  
  categoryMap.forEach((count, slug) => {
    gameCategories.push({
      name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
      slug,
      count,
      icon: getCategoryIcon(slug)
    });
  });
  
  return gameCategories.sort((a, b) => b.count - a.count);
}

// 获取分类图标
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'action': '⚔️',
    'adventure': '��️',
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
  
  // 对文件名进行URL编码以处理特殊字符（如单引号）
  const encodedFilename = encodeURIComponent(game.localThumbnail);
  return `/improved-game-data/images/${encodedFilename}`;
}

// 服务器端专用：获取游戏详细内容
export async function getGameContent(gameTitle: string): Promise<GameContent | null> {
  // 这个功能在部署到Vercel后将使用API路由实现
  // 此处返回空数据防止构建错误
  return null;
} 