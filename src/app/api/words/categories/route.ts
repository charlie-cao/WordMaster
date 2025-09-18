import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { ApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const wordsCollection = db.collection(COLLECTIONS.WORDS);

    // 获取所有不同的标签
    const tags = await wordsCollection.distinct('tags');
    
    // 获取难度分布
    const difficultyStats = await wordsCollection.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    // 获取按标签分组的统计
    const tagStats = await wordsCollection.aggregate([
      {
        $unwind: '$tags'
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]).toArray();

    // 获取总数
    const totalWords = await wordsCollection.countDocuments();

    const categories = {
      total: totalWords,
      difficulties: difficultyStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {} as Record<string, number>),
      tags: tagStats.map(item => ({
        name: item._id,
        count: item.count
      })),
      allTags: tags
    };

    return NextResponse.json<ApiResponse>({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '获取分类信息失败'
    }, { status: 500 });
  }
}
