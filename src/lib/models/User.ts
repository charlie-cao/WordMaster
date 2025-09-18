import { ObjectId } from 'mongodb';
import { User, UserSettings, UserStats } from '@/types';

export interface UserDocument extends Omit<User, '_id'> {
  _id: ObjectId;
  password: string; // 加密后的密码
  emailVerified?: Date;
  lastLoginAt?: Date;
}

export const defaultUserSettings: UserSettings = {
  dailyGoal: 20,
  difficulty: 'medium',
  theme: 'system',
  language: 'zh',
};

export const defaultUserStats: UserStats = {
  totalWords: 0,
  masteredWords: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalStudyTime: 0,
  wordsLearnedToday: 0,
};

export function createUserDocument(userData: {
  email: string;
  username: string;
  password: string;
}): Omit<UserDocument, '_id'> {
  const now = new Date();
  
  return {
    email: userData.email,
    username: userData.username,
    password: userData.password,
    createdAt: now,
    updatedAt: now,
    settings: defaultUserSettings,
    stats: defaultUserStats,
  };
}

export function sanitizeUser(user: UserDocument): User {
  const { password, ...sanitized } = user;
  return {
    ...sanitized,
    _id: user._id.toString(),
  };
}
