# 🎯 WordMaster - 智能记单词应用

<div align="center">

![WordMaster Logo](https://img.shields.io/badge/WordMaster-智能记单词-blue?style=for-the-badge&logo=book&logoColor=white)

一个基于 Next.js 和 MongoDB 的现代化英语单词学习应用，采用科学的记忆算法帮助用户高效掌握词汇。

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

</div>

## ✨ 核心特性

- 🧠 **智能学习算法** - 基于艾宾浩斯遗忘曲线的复习系统
- 🎮 **游戏化学习** - 连击系统、成就徽章、每日挑战  
- 📊 **数据可视化** - 详细的学习统计和进度分析
- 🔄 **多种学习模式** - 卡片学习、测验、听力训练
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎨 **现代化UI** - 渐变设计、毛玻璃效果、流畅动画
- 🔐 **用户认证** - 安全的登录注册系统
- 📚 **丰富词库** - 43个精选单词，5个专业单词本

## 🛠️ 技术栈

- **前端**: Next.js 14, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: MongoDB (Docker)
- **UI组件**: Radix UI, Shadcn/ui
- **状态管理**: Zustand
- **认证**: NextAuth.js
- **图表**: Recharts
- **动画**: Framer Motion

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd wordmaster
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动 MongoDB
```bash
npm run docker:up
```

### 4. 配置环境变量
```bash
cp env.example .env.local
# 编辑 .env.local 文件，配置必要的环境变量
```

### 5. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始使用应用。

## 📁 项目结构

```
wordmaster/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # 认证相关页面
│   │   ├── dashboard/      # 主面板页面
│   │   ├── study/          # 学习相关页面
│   │   ├── api/            # API 路由
│   │   └── globals.css     # 全局样式
│   ├── components/         # React 组件
│   │   ├── ui/            # 基础 UI 组件
│   │   ├── forms/         # 表单组件
│   │   ├── charts/        # 图表组件
│   │   └── study/         # 学习相关组件
│   ├── lib/               # 工具库
│   │   ├── mongodb.ts     # 数据库连接
│   │   ├── auth.ts        # 认证配置
│   │   └── utils.ts       # 工具函数
│   ├── types/             # TypeScript 类型定义
│   ├── hooks/             # 自定义 React Hooks
│   └── store/             # 状态管理
├── public/                # 静态资源
├── scripts/               # 脚本文件
│   └── seed.ts           # 数据库种子数据
├── docker-compose.yml     # Docker 配置
└── package.json          # 项目配置
```

## 🗄️ 数据库设计

### 核心数据模型

- **User** - 用户信息和学习统计
- **Word** - 单词数据和释义
- **UserWordProgress** - 用户学习进度
- **StudySession** - 学习会话记录
- **WordSet** - 单词本/词汇集

## 📊 学习算法

### 艾宾浩斯遗忘曲线
应用采用科学的间隔重复算法：
- 第一次复习：1天后
- 第二次复习：3天后
- 第三次复习：7天后
- 第四次复习：15天后
- 第五次复习：30天后

### 难度自适应
系统会根据用户的答题情况动态调整：
- 连续答对：增加间隔时间
- 答错：缩短间隔时间，增加复习频率

## 🎯 核心功能

### 学习模式
- **每日学习** - 新单词学习
- **复习模式** - 基于遗忘曲线的智能复习
- **测验模式** - 选择题和填空题测试
- **挑战模式** - 限时挑战和竞技

### 数据统计
- 学习进度追踪
- 词汇掌握度分析
- 学习时间统计
- 成就系统

## 🐳 Docker 部署

### 开发环境
```bash
# 启动 MongoDB 和 Mongo Express
npm run docker:up

# 停止服务
npm run docker:down
```

### 生产环境
```bash
# 构建应用
npm run build

# 启动生产服务器
npm start
```

## 🔧 可用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查
npm run type-check   # TypeScript 类型检查
npm run docker:up    # 启动 Docker 服务
npm run docker:down  # 停止 Docker 服务
npm run seed         # 初始化数据库数据
```

## 🌐 API 文档

### 认证 API
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 单词 API  
- `GET /api/words` - 获取单词列表
- `GET /api/words/:id` - 获取单词详情
- `GET /api/words/search` - 搜索单词

### 学习 API
- `GET /api/study/daily` - 获取每日学习任务
- `POST /api/study/quiz` - 生成测验
- `GET /api/progress/due` - 获取待复习单词

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [MongoDB](https://www.mongodb.com/) - 数据库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Radix UI](https://www.radix-ui.com/) - UI 组件库
# WordMaster
