// 游戏数据类型定义
export interface Game {
  title: string;
  url: string;
  category: string;
  gameFrame: string;
  thumbnail: string;
  localThumbnail: string;
  hasControls: boolean;
  hasHowToPlay: boolean;
  hasTips: boolean;
  hasDeveloper: boolean;
  similarGamesCount: number;
  categoryName: string;
  categoryIcon: string;
}

// 详细游戏内容类型
export interface GameContent {
  url: string;
  title: string;
  category: string;
  thumbnail: string;
  thumbnailDetails?: {
    src: string;
    srcset: string;
    alt: string;
    width: number;
    height: number;
    className: string;
    parentClass: string;
  };
  gameFrame: string;
  content: {
    headings: Array<{
      type: string;
      text: string;
    }>;
    controls: string[];
    howToPlay: string;
    tips: string;
    developer: string;
    similarGames: Array<{
      title: string;
      url: string;
    }>;
  };
  fullContent: string;
  extractedAt: string;
  localThumbnail: string;
}

// 游戏分类
export interface GameCategory {
  name: string;
  slug: string;
  count: number;
  icon?: string;
}

// 搜索参数
export interface SearchParams {
  category?: string;
  search?: string;
  page?: number;
} 