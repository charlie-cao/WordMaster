import { ObjectId } from 'mongodb';
import { Word, WordDefinition } from '@/types';

export interface WordDocument extends Omit<Word, '_id'> {
  _id: ObjectId;
}

export function createWordDocument(wordData: {
  word: string;
  pronunciation: string;
  definitions: WordDefinition[];
  difficulty?: 'easy' | 'medium' | 'hard';
  frequency?: number;
  tags?: string[];
  audioUrl?: string;
}): Omit<WordDocument, '_id'> {
  const now = new Date();
  
  return {
    word: wordData.word.toLowerCase(),
    pronunciation: wordData.pronunciation,
    definitions: wordData.definitions,
    difficulty: wordData.difficulty || 'medium',
    frequency: wordData.frequency || 1,
    tags: wordData.tags || [],
    audioUrl: wordData.audioUrl,
    createdAt: now,
    updatedAt: now,
  };
}

export function sanitizeWord(word: WordDocument): Word {
  return {
    ...word,
    _id: word._id.toString(),
  };
}

// 预设的一些基础单词数据
export const sampleWords = [
  {
    word: 'hello',
    pronunciation: '/həˈloʊ/',
    definitions: [
      {
        partOfSpeech: 'interjection',
        meaning: '你好；喂',
        example: 'Hello, how are you?',
        exampleTranslation: '你好，你好吗？'
      }
    ],
    difficulty: 'easy' as const,
    frequency: 10000,
    tags: ['basic', 'greeting']
  },
  {
    word: 'world',
    pronunciation: '/wɜːrld/',
    definitions: [
      {
        partOfSpeech: 'noun',
        meaning: '世界；地球',
        example: 'The world is full of wonders.',
        exampleTranslation: '世界充满了奇迹。'
      }
    ],
    difficulty: 'easy' as const,
    frequency: 8000,
    tags: ['basic', 'noun']
  },
  {
    word: 'study',
    pronunciation: '/ˈstʌdi/',
    definitions: [
      {
        partOfSpeech: 'verb',
        meaning: '学习；研究',
        example: 'I study English every day.',
        exampleTranslation: '我每天学习英语。'
      },
      {
        partOfSpeech: 'noun',
        meaning: '学习；研究',
        example: 'The study of languages is fascinating.',
        exampleTranslation: '语言研究很有趣。'
      }
    ],
    difficulty: 'medium' as const,
    frequency: 5000,
    tags: ['education', 'verb', 'noun']
  },
  {
    word: 'knowledge',
    pronunciation: '/ˈnɑːlɪdʒ/',
    definitions: [
      {
        partOfSpeech: 'noun',
        meaning: '知识；学问',
        example: 'Knowledge is power.',
        exampleTranslation: '知识就是力量。'
      }
    ],
    difficulty: 'medium' as const,
    frequency: 3000,
    tags: ['education', 'abstract']
  },
  {
    word: 'sophisticated',
    pronunciation: '/səˈfɪstɪkeɪtɪd/',
    definitions: [
      {
        partOfSpeech: 'adjective',
        meaning: '复杂的；精密的；老练的',
        example: 'She has sophisticated taste in art.',
        exampleTranslation: '她在艺术方面品味很高。'
      }
    ],
    difficulty: 'hard' as const,
    frequency: 1000,
    tags: ['advanced', 'adjective']
  }
];
