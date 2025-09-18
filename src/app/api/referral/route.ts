import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { ApiResponse } from '@/types';
import { createReferralDocument, generateReferralCode } from '@/lib/models/Referral';

// 获取用户的推荐信息
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    const db = await getDatabase();
    const referralsCollection = db.collection(COLLECTIONS.REFERRALS);
    const usersCollection = db.collection(COLLECTIONS.USERS);

    // 获取用户的推荐码
    let userReferralCode = user.referralCode;
    if (!userReferralCode) {
      // 如果用户没有推荐码，生成一个
      userReferralCode = generateReferralCode(user._id);
      await usersCollection.updateOne(
        { _id: user._id },
        { $set: { referralCode: userReferralCode } }
      );
    }

    // 获取推荐统计
    const referralStats = await referralsCollection.aggregate([
      { $match: { referrerId: user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRewards: { $sum: '$rewardPoints' }
        }
      }
    ]).toArray();

    // 获取最近的推荐记录
    const recentReferrals = await referralsCollection
      .find({ referrerId: user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    const stats = {
      referralCode: userReferralCode,
      totalInvites: referralStats.reduce((sum, stat) => sum + stat.count, 0),
      successfulInvites: referralStats.find(stat => stat._id === 'completed')?.count || 0,
      totalRewards: referralStats.reduce((sum, stat) => sum + stat.totalRewards, 0),
      pendingInvites: referralStats.find(stat => stat._id === 'pending')?.count || 0,
      recentReferrals: recentReferrals.map(ref => ({
        ...ref,
        _id: ref._id.toString(),
        referrerId: ref.referrerId.toString(),
        refereeId: ref.refereeId?.toString()
      }))
    };

    return NextResponse.json<ApiResponse>({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get referral stats error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '获取推荐信息失败'
    }, { status: 500 });
  }
});

// 创建推荐链接
export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const db = await getDatabase();
    const referralsCollection = db.collection(COLLECTIONS.REFERRALS);

    // 创建新的推荐记录
    const referralDoc = createReferralDocument(user._id);
    const result = await referralsCollection.insertOne(referralDoc);

    const referralLink = `${process.env.NEXTAUTH_URL}/auth/register?ref=${referralDoc.referralCode}`;

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        referralCode: referralDoc.referralCode,
        referralLink,
        rewardPoints: referralDoc.rewardPoints
      },
      message: '推荐链接创建成功'
    });

  } catch (error) {
    console.error('Create referral error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '创建推荐链接失败'
    }, { status: 500 });
  }
});
