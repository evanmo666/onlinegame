# OnlineGame.run - 免费在线游戏平台

一个基于 Next.js 15 的现代化在线游戏平台，提供免费的网页游戏体验。

## 🎮 项目特色

- **科幻主题设计** - 酷炫的霓虹灯效果和渐变色彩
- **响应式布局** - 完美适配PC和移动设备
- **游戏分类系统** - 智能分类和搜索功能
- **游戏详情页** - 完整的游戏信息和iframe播放
- **管理后台** - 游戏管理和数据统计
- **SEO优化** - 完整的元数据和结构化数据
- **高性能** - Next.js 15 App Router架构

## 🚀 技术栈

- **前端框架**: Next.js 15 + TypeScript
- **样式系统**: Tailwind CSS
- **UI组件**: Lucide React Icons
- **部署平台**: Vercel
- **开发工具**: ESLint + Prettier

## 📁 项目结构

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # 全局布局和SEO配置
│   ├── page.tsx           # 主页（服务器组件）
│   ├── game/[slug]/       # 游戏详情页
│   └── admin/             # 管理后台
├── components/            # React组件
│   ├── Header.tsx         # 顶部导航
│   ├── Sidebar.tsx        # 分类侧边栏
│   ├── GameGrid.tsx       # 游戏网格展示
│   ├── GameList.tsx       # 游戏列表展示
│   ├── GameDetailContent.tsx # 游戏详情内容
│   ├── PageContent.tsx    # 主页内容（客户端组件）
│   ├── AdminContent.tsx   # 管理后台内容
│   └── Footer.tsx         # 页脚
├── lib/                   # 工具函数和数据处理
│   └── games.ts           # 游戏数据处理逻辑
├── types/                 # TypeScript类型定义
│   └── game.ts            # 游戏相关类型
└── data/                  # 静态数据
    └── categories.json    # 游戏分类数据

improved-game-data/        # 游戏数据目录
├── games-summary.json     # 游戏汇总数据
├── content/               # 游戏详细内容
└── images/                # 游戏缩略图
```

## 🛠️ 安装和运行

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 本地开发

1. **克隆项目**
```bash
git clone <repository-url>
cd new-web
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
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建和部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 🎯 核心功能

### 游戏展示
- 网格和列表两种展示模式
- 分页功能（每页36个游戏）
- 实时搜索和分类筛选
- 游戏缩略图和基本信息展示

### 游戏详情
- 完整的游戏信息展示
- iframe游戏播放器
- 游戏控制说明
- 玩法介绍和技巧
- 社交分享功能
- 相似游戏推荐

### 分类系统
- 动态分类加载
- 分类游戏数量统计
- 图标化分类展示
- 响应式侧边栏

### 搜索功能
- 实时搜索建议
- 多字段搜索（标题、分类）
- 搜索结果高亮
- 搜索历史记录

### 管理后台
- 游戏数据管理
- 分类管理
- 用户统计
- 系统监控

## 🎨 设计系统

### 色彩主题
- **主色调**: 青色 (#00FFFF)
- **背景**: 深色渐变 (#0F172A → #1E293B)
- **文字**: 白色和灰色层次
- **强调色**: 霓虹青色和紫色

### 组件样式
- **按钮**: 霓虹灯边框效果
- **卡片**: 半透明背景和模糊效果
- **动画**: 平滑过渡和悬停效果
- **字体**: Cyber风格字体

## 📱 响应式设计

- **桌面端**: 完整功能和侧边栏
- **平板端**: 适配中等屏幕
- **移动端**: 折叠式导航和优化布局

## 🔧 配置文件

### Next.js配置 (next.config.js)
- 图片域名白名单
- 静态资源配置
- 构建优化设置

### Tailwind配置 (tailwind.config.js)
- 自定义颜色主题
- 科幻风格字体
- 响应式断点

### TypeScript配置 (tsconfig.json)
- 严格类型检查
- 路径别名配置
- 编译选项优化

## 📊 SEO优化

### 元数据配置
- 动态页面标题和描述
- Open Graph标签
- Twitter卡片
- Canonical URLs

### 结构化数据
- JSON-LD格式
- 游戏和网站信息
- 搜索引擎优化

### 性能优化
- 图片懒加载
- 代码分割
- 静态生成
- CDN优化

## 🚀 部署指南

### Vercel部署
1. 连接GitHub仓库
2. 配置环境变量
3. 自动部署设置
4. 域名配置

### 环境变量
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🚀 部署状态

### 生产环境
- **主域名**: https://onlinegame.run ✅
- **Vercel URL**: https://new-web-evanmo666-8324-evanmo666-gmailcoms-projects.vercel.app ✅
- **部署状态**: 已成功部署
- **最后更新**: 2025年1月27日

### 部署历史
- **2025-01-27**: 修复Vercel部署问题，改进游戏数据加载逻辑
- **2025-01-27**: 修复缩略图显示问题，添加URL编码处理
- **2025-01-27**: 配置onlinegame.run域名，项目正式上线

## 🎯 项目更新日志

### v1.2.0 (2025-01-27) - Vercel部署优化
**新功能:**
- ✅ 修复生产环境游戏数据加载问题
- ✅ 改进动态导入逻辑，支持服务器端渲染
- ✅ 配置onlinegame.run域名
- ✅ 优化错误处理和备用方案

**技术改进:**
- 🔧 修复Game接口类型定义，支持gameFrame为null
- 🔧 改进游戏数据同步/异步加载机制
- 🔧 增强生产环境兼容性

### v1.1.0 (2025-01-27) - 缩略图修复
**修复问题:**
- 🐛 修复缩略图不显示问题
- 🐛 解决文件名特殊字符URL编码问题
- 🐛 改进图片加载错误处理

**技术优化:**
- 🔧 对缩略图文件名进行URL编码
- 🔧 添加图片加载失败备用机制
- 🔧 增强开发环境调试功能

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目链接: [https://github.com/your-username/onlinegame-run](https://github.com/your-username/onlinegame-run)
- 演示地址: [https://onlinegame-run.vercel.app](https://onlinegame-run.vercel.app)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Lucide React](https://lucide.dev/) - 图标库
- [Vercel](https://vercel.com/) - 部署平台