import { ObjectId } from 'mongodb';

// 推荐记录模型
export interface ReferralDocument {
  _id: ObjectId;
  referrerId: ObjectId;      // 推荐人ID
  refereeId?: ObjectId;      // 被推荐人ID (注册后填入)
  referralCode: string;      // 推荐码
  status: 'pending' | 'completed' | 'rewarded'; // 状态
  rewardPoints: number;      // 奖励积分
  createdAt: Date;
  completedAt?: Date;        // 完成时间
  rewardedAt?: Date;         // 奖励发放时间
}

// 用户积分记录
export interface UserPointsDocument {
  _id: ObjectId;
  userId: ObjectId;
  totalPoints: number;       // 总积分
  availablePoints: number;   // 可用积分
  transactions: PointTransaction[]; // 积分交易记录
  createdAt: Date;
  updatedAt: Date;
}

export interface PointTransaction {
  type: 'earn' | 'spend';
  amount: number;
  reason: string;           // 获得/消费原因
  referralId?: string;      // 关联的推荐记录
  timestamp: Date;
}

// 分享记录模型
export interface ShareDocument {
  _id: ObjectId;
  userId: ObjectId;
  type: 'achievement' | 'progress' | 'word_card' | 'study_report';
  content: {
    title: string;
    description: string;
    imageUrl?: string;
    data: any;              // 分享的具体数据
  };
  platform: 'wechat' | 'weibo' | 'qq' | 'link' | 'other';
  clicks: number;           // 点击次数
  conversions: number;      // 转化次数
  createdAt: Date;
}

// 生成推荐码
export function generateReferralCode(userId: string): string {
  const prefix = 'WM';
  const timestamp = Date.now().toString(36);
  const userHash = userId.slice(-4);
  const random = Math.random().toString(36).substring(2, 6);
  
  return `${prefix}${timestamp}${userHash}${random}`.toUpperCase();
}

// 创建推荐记录
export function createReferralDocument(referrerId: string): Omit<ReferralDocument, '_id'> {
  return {
    referrerId: new ObjectId(referrerId),
    referralCode: generateReferralCode(referrerId),
    status: 'pending',
    rewardPoints: 50, // 基础奖励积分
    createdAt: new Date()
  };
}

// 创建积分记录
export function createUserPointsDocument(userId: string): Omit<UserPointsDocument, '_id'> {
  return {
    userId: new ObjectId(userId),
    totalPoints: 0,
    availablePoints: 0,
    transactions: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// 添加积分交易
export function addPointTransaction(
  userId: string,
  type: 'earn' | 'spend',
  amount: number,
  reason: string,
  referralId?: string
): PointTransaction {
  return {
    type,
    amount,
    reason,
    referralId,
    timestamp: new Date()
  };
}
