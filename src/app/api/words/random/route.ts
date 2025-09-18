import { NextRequest, NextResponse } from 'next/server';
import { WordService } from '@/lib/services/wordService';
import { ApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const count = parseInt(searchParams.get('count') || '10');
    const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard' | null;

    // 确保示例单词已初始化
    await WordService.initializeSampleWords();

    const words = await WordService.getRandomWords(count, difficulty || undefined);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: words
    });

  } catch (error) {
    console.error('Get random words error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '获取随机单词失败'
    }, { status: 500 });
  }
}
