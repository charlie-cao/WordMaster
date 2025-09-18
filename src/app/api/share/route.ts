import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { ApiResponse } from '@/types';
import { ObjectId } from 'mongodb';

// 创建分享记录
export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { type, content, platform = 'link' } = body;

    if (!type || !content) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '分享类型和内容不能为空'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const sharesCollection = db.collection(COLLECTIONS.SHARES);

    const shareDoc = {
      userId: new ObjectId(user._id),
      type,
      content,
      platform,
      clicks: 0,
      conversions: 0,
      createdAt: new Date()
    };

    const result = await sharesCollection.insertOne(shareDoc);

    // 生成分享链接
    const shareId = result.insertedId.toString();
    const shareLink = `${process.env.NEXTAUTH_URL}/share/${shareId}`;

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        shareId,
        shareLink,
        content
      },
      message: '分享链接创建成功'
    });

  } catch (error) {
    console.error('Create share error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '创建分享失败'
    }, { status: 500 });
  }
});

// 获取用户分享统计
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const db = await getDatabase();
    const sharesCollection = db.collection(COLLECTIONS.SHARES);

    // 获取分享统计
    const shareStats = await sharesCollection.aggregate([
      { $match: { userId: new ObjectId(user._id) } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalClicks: { $sum: '$clicks' },
          totalConversions: { $sum: '$conversions' }
        }
      }
    ]).toArray();

    // 获取最近分享
    const recentShares = await sharesCollection
      .find({ userId: new ObjectId(user._id) })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const stats = {
      totalShares: shareStats.reduce((sum, stat) => sum + stat.count, 0),
      totalClicks: shareStats.reduce((sum, stat) => sum + stat.totalClicks, 0),
      totalConversions: shareStats.reduce((sum, stat) => sum + stat.totalConversions, 0),
      sharesByType: shareStats,
      recentShares: recentShares.map(share => ({
        ...share,
        _id: share._id.toString(),
        userId: share.userId.toString()
      }))
    };

    return NextResponse.json<ApiResponse>({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get share stats error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '获取分享统计失败'
    }, { status: 500 });
  }
});
