# 📡 WordMaster API 文档

## 🔗 基础信息

- **Base URL**: `http://localhost:3000/api`
- **认证方式**: JWT Token (Cookie 或 Authorization Header)
- **数据格式**: JSON
- **字符编码**: UTF-8

## 🔐 认证接口

### 用户注册
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com", 
  "password": "password123",
  "confirmPassword": "password123"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "testuser",
    "email": "test@example.com",
    "settings": {...},
    "stats": {...}
  },
  "message": "注册成功"
}
```

### 用户登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "登录成功"
}
```

### 退出登录
```http
POST /api/auth/logout
```

**响应示例**:
```json
{
  "success": true,
  "message": "退出登录成功"
}
```

### 获取当前用户
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "testuser",
    "email": "test@example.com",
    "settings": {
      "dailyGoal": 20,
      "difficulty": "medium",
      "theme": "system",
      "language": "zh"
    },
    "stats": {
      "totalWords": 125,
      "masteredWords": 89,
      "currentStreak": 7,
      "longestStreak": 28,
      "totalStudyTime": 1240,
      "wordsLearnedToday": 12
    }
  }
}
```

## 📚 单词接口

### 获取单词列表
```http
GET /api/words?page=1&limit=10&difficulty=medium&search=hello&tags=CET4,basic
```

**查询参数**:
- `page` (可选): 页码，默认1
- `limit` (可选): 每页数量，默认20
- `difficulty` (可选): 难度筛选 (easy/medium/hard)
- `search` (可选): 搜索关键词
- `tags` (可选): 标签筛选，逗号分隔

**响应示例**:
```json
{
  "success": true,
  "data": {
    "words": [
      {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
        "word": "hello",
        "pronunciation": "/həˈloʊ/",
        "definitions": [
          {
            "partOfSpeech": "interjection",
            "meaning": "你好；喂",
            "example": "Hello, how are you?",
            "exampleTranslation": "你好，你好吗？"
          }
        ],
        "difficulty": "easy",
        "frequency": 10000,
        "tags": ["basic", "greeting"],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 43,
    "page": 1,
    "totalPages": 5
  }
}
```

### 获取随机单词
```http
GET /api/words/random?count=10&difficulty=medium
```

**查询参数**:
- `count` (可选): 单词数量，默认10
- `difficulty` (可选): 难度筛选

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "word": "study",
      "pronunciation": "/ˈstʌdi/",
      "definitions": [...],
      "difficulty": "medium",
      "frequency": 5000,
      "tags": ["education", "verb", "noun"]
    }
  ]
}
```

### 获取分类统计
```http
GET /api/words/categories
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "total": 43,
    "difficulties": {
      "easy": 8,
      "medium": 21,
      "hard": 14
    },
    "tags": [
      {
        "name": "adjective",
        "count": 18
      },
      {
        "name": "noun", 
        "count": 16
      }
    ],
    "allTags": ["adjective", "noun", "verb", "CET4", "CET6", ...]
  }
}
```

## 📖 单词本接口

### 获取单词本列表
```http
GET /api/wordsets
Authorization: Bearer <token>
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
      "name": "CET4 核心词汇",
      "description": "大学英语四级考试核心单词",
      "category": "CET4",
      "words": ["64f1a2b3c4d5e6f7a8b9c0d2", ...],
      "wordCount": 42,
      "isPublic": true,
      "createdBy": "64f1a2b3c4d5e6f7a8b9c0d1",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 创建单词本
```http
POST /api/wordsets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "我的单词本",
  "description": "个人收藏的单词",
  "category": "custom",
  "isPublic": false
}
```

## 🚨 错误处理

### 标准错误响应
```json
{
  "success": false,
  "error": "错误描述信息"
}
```

### HTTP 状态码
- `200` - 成功
- `201` - 创建成功
- `400` - 请求参数错误
- `401` - 未认证
- `403` - 权限不足
- `404` - 资源不存在
- `500` - 服务器内部错误

### 常见错误码
- `INVALID_CREDENTIALS` - 登录凭据无效
- `USER_EXISTS` - 用户已存在
- `INVALID_TOKEN` - Token无效
- `MISSING_FIELDS` - 必填字段缺失
- `DATABASE_ERROR` - 数据库操作失败

## 🔒 安全说明

### 认证机制
- JWT Token 有效期：7天
- HTTP-only Cookie 存储
- CSRF 保护
- 密码 bcrypt 加密

### 权限控制
- 用户只能访问自己的数据
- 公开单词本所有人可见
- API 接口需要认证

### 数据验证
- 邮箱格式验证
- 密码强度检查
- 输入数据清理
- SQL注入防护

## 📊 性能优化

### 数据库优化
- MongoDB 索引优化
- 分页查询限制
- 聚合查询优化

### API 优化
- 响应数据压缩
- 缓存策略
- 请求频率限制

### 前端优化
- 组件懒加载
- 图片优化
- 代码分割

## 🔧 扩展指南

### 添加新的API接口
1. 在 `src/app/api/` 下创建路由文件
2. 实现 HTTP 方法处理函数
3. 添加类型定义
4. 编写测试用例

### 添加新的页面
1. 在 `src/app/` 下创建页面目录
2. 实现页面组件
3. 添加导航链接
4. 更新路由配置

### 添加新的单词数据
1. 编辑 `scripts/extended-words.ts`
2. 运行 `npm run reset-db`
3. 运行 `npm run seed`
4. 运行 `npm run create-wordsets`

---

**API版本**: v1.0.0  
**最后更新**: 2025年9月18日  
**维护者**: WordMaster Team
