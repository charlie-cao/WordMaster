import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { ApiResponse } from '@/types';
import { ObjectId } from 'mongodb';

// 获取用户的单词本列表
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const db = await getDatabase();
    const wordsetsCollection = db.collection(COLLECTIONS.WORD_SETS);

    // 获取用户的单词本
    const wordsets = await wordsetsCollection
      .find({ 
        $or: [
          { createdBy: new ObjectId(user._id) },
          { isPublic: true }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();

    // 为每个单词本添加单词数量
    const wordsetsWithCount = await Promise.all(
      wordsets.map(async (wordset) => {
        const wordCount = wordset.words ? wordset.words.length : 0;
        return {
          ...wordset,
          _id: wordset._id.toString(),
          createdBy: wordset.createdBy.toString(),
          wordCount
        };
      })
    );

    return NextResponse.json<ApiResponse>({
      success: true,
      data: wordsetsWithCount
    });

  } catch (error) {
    console.error('Get wordsets error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '获取单词本失败'
    }, { status: 500 });
  }
});

// 创建新的单词本
export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { name, description, category, isPublic = false } = body;

    if (!name) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '单词本名称不能为空'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const wordsetsCollection = db.collection(COLLECTIONS.WORD_SETS);

    const wordset = {
      name,
      description: description || '',
      category: category || 'custom',
      words: [],
      isPublic: Boolean(isPublic),
      createdBy: new ObjectId(user._id),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await wordsetsCollection.insertOne(wordset);
    
    const createdWordset = await wordsetsCollection.findOne({ _id: result.insertedId });
    
    if (!createdWordset) {
      throw new Error('单词本创建失败');
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        ...createdWordset,
        _id: createdWordset._id.toString(),
        createdBy: createdWordset.createdBy.toString(),
        wordCount: 0
      },
      message: '单词本创建成功'
    }, { status: 201 });

  } catch (error) {
    console.error('Create wordset error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '创建单词本失败'
    }, { status: 500 });
  }
});
