#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 WordMaster 开发环境快速配置\n');

// 检查 .env.local 文件
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 创建环境变量文件...');
  const envContent = `# 数据库配置
MONGODB_URI=mongodb://admin:password123@localhost:27017/wordmaster?authSource=admin
DATABASE_NAME=wordmaster

# NextAuth配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=wordmaster-nextauth-secret-key-2024

# JWT配置
JWT_SECRET=wordmaster-jwt-secret-key-2024

# API配置
API_BASE_URL=http://localhost:3000/api

# 开发模式
NODE_ENV=development
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ 环境变量文件创建完成');
}

// 检查 Docker 是否运行
try {
  execSync('docker --version', { stdio: 'ignore' });
  console.log('✅ Docker 已安装');
  
  // 启动 MongoDB
  console.log('🐳 启动 MongoDB 容器...');
  execSync('docker-compose up -d', { stdio: 'inherit' });
  console.log('✅ MongoDB 启动完成');
  
} catch (error) {
  console.log('❌ Docker 未安装或未启动，请手动启动 MongoDB');
}

// 安装依赖
console.log('📦 检查依赖...');
if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
  console.log('📦 安装项目依赖...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ 依赖安装完成');
}

// 初始化数据库
console.log('🗄️ 初始化数据库...');
try {
  process.env.MONGODB_URI = 'mongodb://admin:password123@localhost:27017/wordmaster?authSource=admin';
  process.env.DATABASE_NAME = 'wordmaster';
  
  // 等待 MongoDB 启动
  setTimeout(() => {
    try {
      execSync('npx tsx scripts/seed.ts', { stdio: 'inherit' });
      execSync('npx tsx scripts/create-wordsets.ts', { stdio: 'inherit' });
      console.log('✅ 数据库初始化完成');
    } catch (error) {
      console.log('⚠️ 数据库初始化失败，请手动运行 npm run seed');
    }
  }, 5000);
  
} catch (error) {
  console.log('⚠️ 数据库初始化失败，请手动运行 npm run seed');
}

console.log('\n🎉 开发环境配置完成！');
console.log('\n📋 下一步操作：');
console.log('1. npm run dev     # 启动开发服务器');
console.log('2. 访问 http://localhost:3000');
console.log('3. 数据库管理: http://localhost:8081');
console.log('\n📚 更多信息请查看 docs/ 目录中的文档');
