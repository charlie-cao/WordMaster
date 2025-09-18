import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { WordDocument, sanitizeWord, createWordDocument, sampleWords } from '@/lib/models/Word';
import { Word } from '@/types';
import { ObjectId } from 'mongodb';

export class WordService {
  static async initializeSampleWords(): Promise<void> {
    const db = await getDatabase();
    const wordsCollection = db.collection<WordDocument>(COLLECTIONS.WORDS);

    // 检查是否已经有数据
    const count = await wordsCollection.countDocuments();
    if (count > 0) {
      return; // 已有数据，不需要初始化
    }

    // 插入示例单词
    const wordDocs = sampleWords.map(word => createWordDocument(word));
    await wordsCollection.insertMany(wordDocs as WordDocument[]);
  }

  static async getWords(options: {
    page?: number;
    limit?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
    search?: string;
  } = {}): Promise<{ words: Word[]; total: number; page: number; totalPages: number }> {
    const db = await getDatabase();
    const wordsCollection = db.collection<WordDocument>(COLLECTIONS.WORDS);

    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    // 构建查询条件
    const query: any = {};
    
    if (options.difficulty) {
      query.difficulty = options.difficulty;
    }
    
    if (options.tags && options.tags.length > 0) {
      query.tags = { $in: options.tags };
    }
    
    if (options.search) {
      query.$or = [
        { word: { $regex: options.search, $options: 'i' } },
        { 'definitions.meaning': { $regex: options.search, $options: 'i' } }
      ];
    }

    // 获取总数
    const total = await wordsCollection.countDocuments(query);
    
    // 获取分页数据
    const wordDocs = await wordsCollection
      .find(query)
      .sort({ frequency: -1, word: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const words = wordDocs.map(sanitizeWord);
    const totalPages = Math.ceil(total / limit);

    return { words, total, page, totalPages };
  }

  static async getWordById(wordId: string): Promise<Word | null> {
    const db = await getDatabase();
    const wordsCollection = db.collection<WordDocument>(COLLECTIONS.WORDS);

    const wordDoc = await wordsCollection.findOne({ _id: new ObjectId(wordId) });
    return wordDoc ? sanitizeWord(wordDoc) : null;
  }

  static async getRandomWords(count: number = 10, difficulty?: 'easy' | 'medium' | 'hard'): Promise<Word[]> {
    const db = await getDatabase();
    const wordsCollection = db.collection<WordDocument>(COLLECTIONS.WORDS);

    const pipeline: any[] = [];
    
    // 添加难度筛选
    if (difficulty) {
      pipeline.push({ $match: { difficulty } });
    }
    
    // 随机抽取
    pipeline.push({ $sample: { size: count } });

    const wordDocs = await wordsCollection.aggregate<WordDocument>(pipeline).toArray();
    return wordDocs.map(sanitizeWord);
  }

  static async searchWords(searchTerm: string, limit: number = 10): Promise<Word[]> {
    const db = await getDatabase();
    const wordsCollection = db.collection<WordDocument>(COLLECTIONS.WORDS);

    const wordDocs = await wordsCollection
      .find({
        $or: [
          { word: { $regex: searchTerm, $options: 'i' } },
          { 'definitions.meaning': { $regex: searchTerm, $options: 'i' } }
        ]
      })
      .limit(limit)
      .toArray();

    return wordDocs.map(sanitizeWord);
  }

  static async createWord(wordData: {
    word: string;
    pronunciation: string;
    definitions: Word['definitions'];
    difficulty?: 'easy' | 'medium' | 'hard';
    frequency?: number;
    tags?: string[];
    audioUrl?: string;
  }): Promise<Word> {
    const db = await getDatabase();
    const wordsCollection = db.collection<WordDocument>(COLLECTIONS.WORDS);

    // 检查单词是否已存在
    const existingWord = await wordsCollection.findOne({ word: wordData.word.toLowerCase() });
    if (existingWord) {
      throw new Error('该单词已存在');
    }

    const wordDoc = createWordDocument(wordData);
    const result = await wordsCollection.insertOne(wordDoc as WordDocument);
    
    const createdWord = await wordsCollection.findOne({ _id: result.insertedId });
    if (!createdWord) {
      throw new Error('单词创建失败');
    }

    return sanitizeWord(createdWord);
  }

  static async getWordsByIds(wordIds: string[]): Promise<Word[]> {
    const db = await getDatabase();
    const wordsCollection = db.collection<WordDocument>(COLLECTIONS.WORDS);

    const objectIds = wordIds.map(id => new ObjectId(id));
    const wordDocs = await wordsCollection
      .find({ _id: { $in: objectIds } })
      .toArray();

    return wordDocs.map(sanitizeWord);
  }

  static async getWordsByDifficulty(difficulty: 'easy' | 'medium' | 'hard', limit: number = 50): Promise<Word[]> {
    const db = await getDatabase();
    const wordsCollection = db.collection<WordDocument>(COLLECTIONS.WORDS);

    const wordDocs = await wordsCollection
      .find({ difficulty })
      .sort({ frequency: -1 })
      .limit(limit)
      .toArray();

    return wordDocs.map(sanitizeWord);
  }
}
