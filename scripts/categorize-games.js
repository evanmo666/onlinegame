// 游戏分类器脚本
// 用于自动为游戏分配更详细的分类

const fs = require('fs');
const path = require('path');

// 读取游戏数据
const gamesDataPath = path.join(__dirname, '../improved-game-data/games-summary.json');
const games = JSON.parse(fs.readFileSync(gamesDataPath, 'utf8'));

console.log(`读取了 ${games.length} 个游戏`);

// 定义更详细的分类系统
const categoryDefinitions = [
  // 动作/冒险类游戏
  {
    slug: 'action',
    name: 'Action Games',
    icon: '⚔️',
    keywords: ['action', 'fight', 'battle', 'warrior', 'combat', 'shooter', 'gun', 'survival']
  },
  {
    slug: 'adventure',
    name: 'Adventure Games',
    icon: '🗺️',
    keywords: ['adventure', 'quest', 'explore', 'journey', 'mission', 'world']
  },
  {
    slug: 'platformer',
    name: 'Platformer Games',
    icon: '🏃',
    keywords: ['platform', 'jump', 'runner', 'run', 'parkour', 'dash', 'escape']
  },
  
  // 射击/格斗类游戏
  {
    slug: 'shooting',
    name: 'Shooting Games',
    icon: '🔫',
    keywords: ['shoot', 'gun', 'sniper', 'fps', 'shooter', 'zombie', 'battle royale', 'pubg', 'fortnite']
  },
  {
    slug: 'battle-royale',
    name: 'Battle Royale Games',
    icon: '🏆',
    keywords: ['battle royale', 'royale', 'pubg', 'fortnite', 'arena', 'survivor']
  },
  {
    slug: 'fighting',
    name: 'Fighting Games',
    icon: '👊',
    keywords: ['fight', 'fighting', 'combat', 'versus', 'duel', 'warrior', 'wrestle', 'boxing']
  },
  
  // 策略/模拟类游戏
  {
    slug: 'strategy',
    name: 'Strategy Games',
    icon: '🧠',
    keywords: ['strategy', 'tower', 'defense', 'kingdom', 'empire', 'war', 'build', 'tactic']
  },
  {
    slug: 'simulation',
    name: 'Simulation Games',
    icon: '🎯',
    keywords: ['simulation', 'simulator', 'life', 'city', 'farm', 'build', 'manage', 'tycoon']
  },
  {
    slug: 'idle',
    name: 'Idle & Clicker Games',
    icon: '👆',
    keywords: ['idle', 'clicker', 'click', 'tap', 'tycoon', 'incremental', 'empire', 'business']
  },
  
  // 益智/思考类游戏
  {
    slug: 'puzzle',
    name: 'Puzzle Games',
    icon: '🧩',
    keywords: ['puzzle', 'match', 'block', 'logic', 'brain', 'solve', 'riddle', 'maze', 'tetris']
  },
  {
    slug: 'word',
    name: 'Word & Trivia Games',
    icon: '📝',
    keywords: ['word', 'trivia', 'quiz', 'spell', 'crossword', 'hangman', 'scrabble']
  },
  {
    slug: 'board',
    name: 'Board Games',
    icon: '🎲',
    keywords: ['board', 'chess', 'checkers', 'card', 'solitaire', 'mahjong', 'dice', 'domino']
  },
  
  // 赛车/运动类游戏
  {
    slug: 'racing',
    name: 'Racing Games',
    icon: '🏎️',
    keywords: ['race', 'racing', 'car', 'drift', 'speed', 'track', 'drive', 'driver', 'moto', 'bike']
  },
  {
    slug: 'sports',
    name: 'Sports Games',
    icon: '⚽',
    keywords: ['sport', 'soccer', 'football', 'basketball', 'baseball', 'golf', 'tennis', 'pool', 'billiard']
  },
  {
    slug: 'fishing',
    name: 'Fishing & Hunting Games',
    icon: '🎣',
    keywords: ['fish', 'fishing', 'hunt', 'hunting', 'catch', 'deer', 'animal']
  },
  
  // 多人/IO类游戏
  {
    slug: 'io-games',
    name: 'IO Games',
    icon: '🌐',
    keywords: ['io', '.io', 'multiplayer', 'online', 'arena', 'battle', 'pvp']
  },
  {
    slug: 'multiplayer',
    name: 'Multiplayer Games',
    icon: '👥',
    keywords: ['multiplayer', 'online', '2 player', '2-player', 'coop', 'cooperative', 'versus']
  },
  
  // 休闲/儿童类游戏
  {
    slug: 'casual',
    name: 'Casual Games',
    icon: '🎪',
    keywords: ['casual', 'simple', 'easy', 'fun', 'relax', 'quick', 'mini']
  },
  {
    slug: 'kids',
    name: 'Kids Games',
    icon: '👶',
    keywords: ['kids', 'child', 'children', 'baby', 'cute', 'family', 'educational', 'learn']
  },
  {
    slug: 'drawing',
    name: 'Drawing & Coloring Games',
    icon: '🎨',
    keywords: ['draw', 'drawing', 'paint', 'color', 'coloring', 'art', 'creative']
  },
  
  // 模拟器/职业类游戏
  {
    slug: 'vehicle-simulator',
    name: 'Vehicle Simulators',
    icon: '🚗',
    keywords: ['car', 'drive', 'driving', 'vehicle', 'simulator', 'truck', 'bus', 'parking', 'flight', 'pilot', 'plane', 'helicopter']
  },
  {
    slug: 'job-simulator',
    name: 'Job Simulators',
    icon: '👨‍💼',
    keywords: ['doctor', 'hospital', 'cook', 'chef', 'restaurant', 'farm', 'farmer', 'police', 'fire', 'fireman', 'job', 'work', 'career']
  },
  
  // 恐怖/生存类游戏
  {
    slug: 'horror',
    name: 'Horror Games',
    icon: '👻',
    keywords: ['horror', 'scary', 'zombie', 'survival', 'escape', 'night', 'dark', 'ghost', 'monster', 'granny', 'evil']
  },
  {
    slug: 'survival',
    name: 'Survival Games',
    icon: '🏕️',
    keywords: ['survival', 'survive', 'craft', 'build', 'mine', 'sandbox', 'open world']
  },
  
  // 时尚/装扮类游戏
  {
    slug: 'fashion',
    name: 'Fashion & Dress Up Games',
    icon: '👗',
    keywords: ['fashion', 'dress', 'makeup', 'beauty', 'salon', 'princess', 'hair', 'style', 'design', 'clothes']
  },
  
  // 经典/复古类游戏
  {
    slug: 'classic',
    name: 'Classic Games',
    icon: '🕹️',
    keywords: ['classic', 'retro', 'arcade', 'vintage', 'old', 'pacman', 'tetris', 'snake', 'space', 'invader']
  },
  
  // 音乐/节奏类游戏
  {
    slug: 'music',
    name: 'Music & Rhythm Games',
    icon: '🎵',
    keywords: ['music', 'rhythm', 'dance', 'sing', 'song', 'beat', 'piano', 'guitar', 'drum', 'fnf', 'friday night']
  }
];

// 记录原始分类数量
const originalCategories = new Set();
games.forEach(game => {
  const category = game.category.replace(/^\/|\/$/g, '').replace(/^t\//, '');
  originalCategories.add(category);
});

console.log(`原始分类数量: ${originalCategories.size}`);
console.log('原始分类:', Array.from(originalCategories).join(', '));

// 为每个游戏分配新分类
let categorizedCount = 0;
const categorizedGames = games.map(game => {
  const gameTitle = game.title.toLowerCase();
  const currentCategory = game.category.replace(/^\/|\/$/g, '').replace(/^t\//, '');
  
  // 尝试根据名称和现有分类找到最合适的新分类
  let bestCategory = null;
  let bestScore = 0;
  
  categoryDefinitions.forEach(category => {
    let score = 0;
    
    // 检查标题中的关键词
    category.keywords.forEach(keyword => {
      if (gameTitle.includes(keyword.toLowerCase())) {
        score += 2;
      }
    });
    
    // 如果当前分类与某个新分类匹配，增加分数
    if (currentCategory === category.slug) {
      score += 5;
    }
    
    // 更新最佳匹配
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  });
  
  // 如果没有找到匹配项或分数太低，保留原始分类
  if (bestScore < 2) {
    // 尝试将原始分类映射到新系统
    const mappedCategory = mapOriginalToNew(currentCategory);
    if (mappedCategory) {
      bestCategory = mappedCategory;
    } else {
      // 默认分类为 casual
      bestCategory = categoryDefinitions.find(c => c.slug === 'casual');
    }
  } else {
    categorizedCount++;
  }
  
  // 创建新游戏对象，更新分类
  return {
    ...game,
    category: `/${bestCategory.slug}/`,
    // 添加其他可能的元数据
    categoryName: bestCategory.name,
    categoryIcon: bestCategory.icon
  };
});

// 将原始分类映射到新分类
function mapOriginalToNew(originalCategory) {
  const mapping = {
    'action': 'action',
    'adventure': 'adventure',
    'puzzle': 'puzzle',
    'racing': 'racing',
    'sports': 'sports',
    'shooting': 'shooting',
    'strategy': 'strategy',
    'arcade': 'classic',
    'multiplayer': 'multiplayer',
    'io-games': 'io-games',
    'car': 'vehicle-simulator',
    'running': 'platformer',
    '2-player': 'multiplayer',
    '3d': null, // 不是一个有效的类别分类
    'html5': null, // 技术分类，不是游戏类型
    'new-games': null, // 不是游戏类型
  };
  
  return mapping[originalCategory] 
    ? categoryDefinitions.find(c => c.slug === mapping[originalCategory]) 
    : null;
}

// 统计新分类数量
const newCategoryCounts = {};
categorizedGames.forEach(game => {
  const category = game.category.replace(/^\/|\/$/g, '');
  newCategoryCounts[category] = (newCategoryCounts[category] || 0) + 1;
});

console.log(`成功分类 ${categorizedCount} 个游戏`);
console.log('新分类统计:');
Object.entries(newCategoryCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    const categoryDef = categoryDefinitions.find(c => c.slug === category);
    console.log(`${categoryDef?.icon || '🎮'} ${category}: ${count} 个游戏`);
  });

// 保存新分类数据
const backupPath = path.join(__dirname, '../improved-game-data/games-summary-backup.json');
fs.writeFileSync(backupPath, JSON.stringify(games, null, 2), 'utf8');
console.log(`已备份原始数据到 ${backupPath}`);

fs.writeFileSync(gamesDataPath, JSON.stringify(categorizedGames, null, 2), 'utf8');
console.log(`已更新游戏分类数据到 ${gamesDataPath}`);

// 创建并保存分类定义
const categoriesPath = path.join(__dirname, '../src/data/categories.json');
const categoriesData = categoryDefinitions.map(category => ({
  slug: category.slug,
  name: category.name,
  icon: category.icon,
  count: newCategoryCounts[category.slug] || 0
})).filter(category => category.count > 0).sort((a, b) => b.count - a.count);

if (!fs.existsSync(path.dirname(categoriesPath))) {
  fs.mkdirSync(path.dirname(categoriesPath), { recursive: true });
}

fs.writeFileSync(categoriesPath, JSON.stringify(categoriesData, null, 2), 'utf8');
console.log(`已保存分类定义到 ${categoriesPath}`);

console.log('分类完成！'); 