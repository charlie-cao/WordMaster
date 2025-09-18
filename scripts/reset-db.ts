import { getDatabase, COLLECTIONS } from '../src/lib/mongodb';

async function resetDatabase() {
  try {
    console.log('开始重置数据库...');
    
    const db = await getDatabase();
    
    // 删除所有集合的数据
    const collections = [COLLECTIONS.WORDS, COLLECTIONS.USERS, COLLECTIONS.USER_WORD_PROGRESS, COLLECTIONS.STUDY_SESSIONS];
    
    for (const collectionName of collections) {
      const collection = db.collection(collectionName);
      const result = await collection.deleteMany({});
      console.log(`删除 ${collectionName} 集合中的 ${result.deletedCount} 个文档`);
    }
    
    console.log('数据库重置完成！');
    
  } catch (error) {
    console.error('数据库重置失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  resetDatabase().then(() => {
    process.exit(0);
  });
}

export { resetDatabase };
