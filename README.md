# OnlineGame.run - 免费在线游戏平台

## 项目概述

OnlineGame.run 是一个现代化的免费在线游戏平台，采用科幻主题设计。用户可以在浏览器中即时玩各种类型的游戏，无需下载。

### 主要特性

- 🎮 **免费游戏平台** - 所有游戏完全免费
- ⚡ **即时游玩** - 无需下载，点击即玩
- 📱 **响应式设计** - 完美适配PC和移动设备
- 🔍 **智能搜索** - 按游戏名称和分类搜索
- 🎯 **分类浏览** - 多种游戏分类
- 🌐 **SEO优化** - 完整的SEO和性能优化
- 🎨 **科幻主题** - 酷炫的霓虹灯风格界面

## 最新更新 (2025-06-17)

### 📊 数据分析功能集成 (2025-06-17)
- 添加Google Analytics (GA4)跟踪代码，实现全站用户行为数据分析
- 集成Vercel Analytics，获取实时性能和用户体验数据
- 优化分析代码加载策略，使用afterInteractive确保不影响页面加载性能
- 支持用户停留时间、页面跳转、来源渠道等多维度数据分析

### 🎨 界面和安全性优化 (2025-06-17)
- 全站字体从Orbitron修改为无衬线体(Sans-serif)，提升阅读体验
- 保留科幻风格元素使用Orbitron字体，如标题、按钮等
- 隐藏后台登录界面的默认账号密码信息，提高安全性
- 优化登录界面文案，引导用户联系管理员获取访问权限

### 🖌️ 前端界面优化 (2025-06-16)
- 移除顶部导航栏中多余的链接（Categories、New Games、Popular）
- 添加游戏列表分页功能，每页显示18个游戏，控制在三屏以内
- 优化主内容区域与侧边栏的间距，减少到20px以内
- 改善界面整体紧凑度和用户体验
- 添加分页导航组件，支持快速浏览大量游戏

### 🔄 游戏分类系统全面升级 (2025-06-15)
- 扩展游戏分类系统，从原有的16个分类扩展到25个更精细的分类
- 添加分类自动识别脚本，根据游戏名称智能分配合适分类
- 新增游戏分类批量管理工具，支持批量修改游戏分类
- 添加分类统计面板，直观展示各分类游戏数量
- 优化分类导航界面，更易于用户浏览和发现游戏

### ⚙️ 系统设置模块 (2025-06-14)
- 新增后台系统设置模块，支持SEO配置
- 添加网站元数据管理功能（标题、描述、关键词）
- 实现社交媒体分享优化设置
- 添加界面自定义选项（主题色、辅助色等）
- 增加性能相关配置选项

### 🔄 服务器重启流程优化 (2025-06-13)
- 记录完整的服务器分步重启流程
- 添加进程管理和端口检查步骤
- 优化临时文件清理方法
- 确保服务器可靠重启而不丢失修改

### 🔄 游戏分类管理优化 (2025-06-12)
- 优化批量修改游戏分类功能，使用下拉选择框代替手动输入
- 添加分类选择模态框，显示现有分类及游戏数量
- 改进单个游戏编辑表单的分类选择界面
- 优化后台UI交互体验

### 🔄 服务器配置更新 (2025-06-11)
- 重新配置开发服务器，固定使用3000端口
- 更新npm脚本配置，确保一致的开发体验
- 优化服务器启动流程，提高开发效率
- 解决端口冲突问题，从3002端口迁移回3000端口

### 🖼️ 游戏缩略图显示修复
- 解决了游戏缩略图无法正确显示的问题
- 添加了`getGameThumbnailPath`工具函数，统一处理图片路径
- 配置Next.js静态资源目录，支持从`improved-game-data/images`加载图片
- 添加中间件处理静态资源路径
- 复制图片到public目录以确保开发和生产环境一致

## 服务器管理

### 重启开发服务器步骤
1. **检查当前进程**
   ```powershell
   tasklist | findstr node
   netstat -ano | findstr :3000
   ```

2. **停止服务器进程**
   ```powershell
   taskkill /PID <进程ID> /F
   ```

3. **确认进程已停止**
   ```powershell
   tasklist | findstr <进程ID>
   netstat -ano | findstr :3000 | findstr LISTENING
   ```

4. **清理临时文件**
   ```powershell
   if (Test-Path .next) { Remove-Item -Recurse -Force .next }
   ```

5. **启动开发服务器**
   ```powershell
   npm run dev
   ```

6. **验证服务器已启动**
   ```powershell
   netstat -ano | findstr :3000 | findstr LISTENING
   ```

## 游戏分类系统

### 分类统计 (2025-06-15)
| 分类 | 名称 | 游戏数量 | 图标 |
|------|------|----------|------|
| racing | Racing Games | 92 | 🏎️ |
| casual | Casual Games | 72 | 🎪 |
| adventure | Adventure Games | 49 | 🗺️ |
| io-games | IO Games | 47 | 🌐 |
| puzzle | Puzzle Games | 46 | 🧩 |
| action | Action Games | 35 | ⚔️ |
| shooting | Shooting Games | 33 | 🔫 |
| vehicle-simulator | Vehicle Simulators | 31 | 🚗 |
| strategy | Strategy Games | 31 | 🧠 |
| sports | Sports Games | 28 | ⚽ |
| simulation | Simulation Games | 22 | 🎯 |
| platformer | Platformer Games | 17 | 🏃 |
| idle | Idle & Clicker Games | 15 | 👆 |
| job-simulator | Job Simulators | 13 | 👨‍💼 |
| fashion | Fashion & Dress Up Games | 12 | 👗 |
| classic | Classic Games | 9 | 🕹️ |
| horror | Horror Games | 6 | 👻 |
| drawing | Drawing & Coloring Games | 4 | 🎨 |
| board | Board Games | 4 | 🎲 |
| fighting | Fighting Games | 3 | 👊 |
| music | Music & Rhythm Games | 3 | 🎵 |
| battle-royale | Battle Royale Games | 3 | 🏆 |
| multiplayer | Multiplayer Games | 3 | 👥 |
| kids | Kids Games | 1 | 👶 |
| fishing | Fishing & Hunting Games | 1 | 🎣 |

### 分类自动识别
- 使用基于关键词的自动分类系统
- 支持通过游戏名称和现有分类进行智能匹配
- 自动为游戏分配最合适的分类
- 批量处理分类更新

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + 自定义CSS
- **图标**: Lucide React
- **字体**: Orbitron (科幻主题字体)
- **部署**: Vercel

## 项目结构

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # 根布局 (服务器组件)
│   ├── page.tsx           # 主页 (服务器组件)
│   ├── globals.css        # 全局样式
│   └── game/[slug]/       # 游戏详情页面
│       └── page.tsx
├── components/            # React组件
│   ├── PageContent.tsx    # 主页内容 (客户端组件)
│   ├── Header.tsx         # 顶部导航
│   ├── Sidebar.tsx        # 侧边栏分类
│   ├── GameGrid.tsx       # 游戏网格展示
│   ├── GameList.tsx       # 游戏列表展示
│   ├── GameDetailContent.tsx # 游戏详情内容
│   ├── UpdateCategoriesContent.tsx # 游戏分类批量管理
│   └── Footer.tsx         # 页脚
├── data/
│   └── categories.json    # 游戏分类定义
├── lib/
│   └── games.ts          # 游戏数据处理逻辑
├── types/
│   └── game.ts           # TypeScript类型定义
scripts/
└── categorize-games.js   # 游戏分类自动识别脚本
improved-game-data/        # 游戏数据
├── games-summary.json    # 游戏汇总数据
├── content/              # 游戏详细内容
└── images/               # 游戏封面图片
public/                    # 静态资源
└── improved-game-data/   # 复制的游戏数据（供静态访问）
    └── images/           # 游戏缩略图
```

## 功能特性

### 🏠 主页功能
- 游戏分类浏览
- 搜索功能
- 网格/列表视图切换
- 响应式侧边栏

### 🎮 游戏详情页
- iframe游戏播放
- 游戏信息展示
- 控制说明
- 社交分享功能
- 相似游戏推荐

### 📱 移动端适配
- 完全响应式设计
- 移动端优化的侧边栏
- 触摸友好的界面
- 移动端搜索体验

### 🔍 SEO优化
- 动态生成metadata
- 结构化数据
- 优化的URL结构
- 图片优化和懒加载
- Canonical URLs

## 安装和运行

### 前置要求
- Node.js 18+ 
- npm 或 yarn

### 本地开发

1. **克隆项目**
```bash
git clone [repository-url]
cd onlinegame-run
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:3000`

### 构建生产版本
```bash
npm run build
npm start
```

## 部署到Vercel

### 自动部署
1. 将代码推送到GitHub
2. 连接Vercel到GitHub仓库
3. Vercel会自动部署

### 手动部署
```bash
npm install -g vercel
vercel
```

### 环境配置
在Vercel中配置以下环境变量：
- `NEXT_PUBLIC_SITE_URL`: https://www.onlinegame.run

## 游戏数据结构

### 游戏汇总数据 (games-summary.json)
```typescript
interface Game {
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
  categoryName: string;  // 新增：分类名称
  categoryIcon: string;  // 新增：分类图标
}
```

### 游戏详细内容
```typescript
interface GameContent {
  url: string;
  title: string;
  category: string;
  thumbnail: string;
  gameFrame: string;
  content: {
    headings: Array<{type: string; text: string}>;
    controls: string[];
    howToPlay: string;
    tips: string;
    developer: string;
    similarGames: Array<{title: string; url: string}>;
  };
  fullContent: string;
  extractedAt: string;
  localThumbnail: string;
}
```