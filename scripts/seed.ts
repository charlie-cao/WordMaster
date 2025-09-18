import { getDatabase, COLLECTIONS } from '../src/lib/mongodb';
import { createWordDocument, sampleWords } from '../src/lib/models/Word';
import { getAllExtendedWords } from './extended-words';

// 合并原有示例单词和扩展单词
const allWords = [
  ...sampleWords,
  ...getAllExtendedWords()
];

async function seedDatabase() {
  try {
    console.log('开始初始化数据库...');
    
    const db = await getDatabase();
    const wordsCollection = db.collection(COLLECTIONS.WORDS);
    
    // 检查是否已有数据
    const existingCount = await wordsCollection.countDocuments();
    console.log(`现有单词数量: ${existingCount}`);
    
    if (existingCount === 0) {
      // 插入单词数据
      const wordDocs = allWords.map(word => createWordDocument(word));
      const result = await wordsCollection.insertMany(wordDocs);
      console.log(`成功插入 ${result.insertedCount} 个单词`);
    } else {
      console.log('数据库已有数据，跳过初始化');
    }
    
    // 显示统计信息
    const totalCount = await wordsCollection.countDocuments();
    const easyCount = await wordsCollection.countDocuments({ difficulty: 'easy' });
    const mediumCount = await wordsCollection.countDocuments({ difficulty: 'medium' });
    const hardCount = await wordsCollection.countDocuments({ difficulty: 'hard' });
    
    console.log('\n数据库统计:');
    console.log(`总单词数: ${totalCount}`);
    console.log(`简单: ${easyCount}`);
    console.log(`中等: ${mediumCount}`);
    console.log(`困难: ${hardCount}`);
    
    console.log('\n数据库初始化完成！');
    
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  seedDatabase().then(() => {
    process.exit(0);
  });
}

export { seedDatabase };
