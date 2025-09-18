import { getDatabase, COLLECTIONS } from '../src/lib/mongodb';
import { ObjectId } from 'mongodb';

// 预设单词本数据
const presetWordsets = [
  {
    name: 'CET4 核心词汇',
    description: '大学英语四级考试核心单词，适合大学生备考使用',
    category: 'CET4',
    isPublic: true,
    tags: ['CET4', 'basic', 'common', 'verb', 'noun', 'adjective']
  },
  {
    name: 'CET6 高频词汇',
    description: '大学英语六级考试高频单词，进阶学习必备',
    category: 'CET6',
    isPublic: true,
    tags: ['CET6', 'formal', 'academic', 'advanced']
  },
  {
    name: '托福词汇精选',
    description: 'TOEFL考试精选词汇，出国留学必备',
    category: 'TOEFL',
    isPublic: true,
    tags: ['TOEFL', 'IELTS', 'advanced', 'academic']
  },
  {
    name: '商务英语词汇',
    description: '商务场景常用词汇，职场英语必备',
    category: 'business',
    isPublic: true,
    tags: ['business', 'career', 'finance', 'market']
  },
  {
    name: '科技英语词汇',
    description: '科技领域专业词汇，IT从业者必备',
    category: 'technology',
    isPublic: true,
    tags: ['technology', 'AI', 'computing', 'modern']
  }
];

async function createWordsets() {
  try {
    console.log('开始创建预设单词本...');
    
    const db = await getDatabase();
    const wordsetsCollection = db.collection(COLLECTIONS.WORD_SETS);
    const wordsCollection = db.collection(COLLECTIONS.WORDS);

    // 检查是否已有单词本
    const existingCount = await wordsetsCollection.countDocuments();
    if (existingCount > 0) {
      console.log('已存在单词本，跳过创建');
      return;
    }

    // 为每个预设单词本找到对应的单词
    for (const preset of presetWordsets) {
      console.log(`创建单词本: ${preset.name}`);
      
      // 根据标签查找对应的单词
      const words = await wordsCollection.find({
        tags: { $in: preset.tags }
      }).toArray();

      const wordset = {
        ...preset,
        words: words.map(word => word._id),
        createdBy: new ObjectId('000000000000000000000001'), // 系统创建
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await wordsetsCollection.insertOne(wordset);
      console.log(`✓ 创建成功: ${preset.name} (${words.length} 个单词)`);
    }

    // 统计信息
    const totalWordsets = await wordsetsCollection.countDocuments();
    console.log(`\n单词本创建完成！`);
    console.log(`总单词本数: ${totalWordsets}`);
    
    // 显示每个单词本的详情
    const wordsets = await wordsetsCollection.find({}).toArray();
    for (const wordset of wordsets) {
      console.log(`- ${wordset.name}: ${wordset.words.length} 个单词`);
    }

  } catch (error) {
    console.error('创建单词本失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  createWordsets().then(() => {
    process.exit(0);
  });
}

export { createWordsets };
