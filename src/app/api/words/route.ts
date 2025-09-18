import { NextRequest, NextResponse } from 'next/server';
import { WordService } from '@/lib/services/wordService';
import { ApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard' | null;
    const search = searchParams.get('search');
    const tagsParam = searchParams.get('tags');
    const tags = tagsParam ? tagsParam.split(',') : undefined;

    // 确保示例单词已初始化
    await WordService.initializeSampleWords();

    const result = await WordService.getWords({
      page,
      limit,
      difficulty: difficulty || undefined,
      tags,
      search: search || undefined
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Get words error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '获取单词列表失败'
    }, { status: 500 });
  }
}
