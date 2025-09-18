import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // 在开发模式下，使用全局变量以避免在热重载时创建多个连接
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // 在生产模式下，创建新的连接
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// 获取数据库实例
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(process.env.DATABASE_NAME || 'wordmaster');
}

// 数据库集合名称常量
export const COLLECTIONS = {
  USERS: 'users',
  WORDS: 'words',
  USER_WORD_PROGRESS: 'userWordProgress',
  STUDY_SESSIONS: 'studySessions',
  WORD_SETS: 'wordSets',
  ACHIEVEMENTS: 'achievements',
} as const;
