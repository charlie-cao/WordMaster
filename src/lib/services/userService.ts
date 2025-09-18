import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { UserDocument, createUserDocument, sanitizeUser } from '@/lib/models/User';
import { User } from '@/types';
import bcrypt from 'bcryptjs';

export class UserService {
  static async createUser(userData: {
    email: string;
    username: string;
    password: string;
  }): Promise<User> {
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>(COLLECTIONS.USERS);

    // 检查邮箱是否已存在
    const existingUser = await usersCollection.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('该邮箱已被注册');
    }

    // 检查用户名是否已存在
    const existingUsername = await usersCollection.findOne({ username: userData.username });
    if (existingUsername) {
      throw new Error('该用户名已被使用');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // 创建用户文档
    const userDoc = createUserDocument({
      ...userData,
      password: hashedPassword,
    });

    // 插入数据库
    const result = await usersCollection.insertOne(userDoc as UserDocument);
    
    // 获取创建的用户
    const createdUser = await usersCollection.findOne({ _id: result.insertedId });
    if (!createdUser) {
      throw new Error('用户创建失败');
    }

    return sanitizeUser(createdUser);
  }

  static async authenticateUser(email: string, password: string): Promise<User> {
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>(COLLECTIONS.USERS);

    // 查找用户
    const user = await usersCollection.findOne({ email });
    if (!user) {
      throw new Error('邮箱或密码错误');
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('邮箱或密码错误');
    }

    // 更新最后登录时间
    await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: { lastLoginAt: new Date(), updatedAt: new Date() }
      }
    );

    return sanitizeUser(user);
  }

  static async getUserById(userId: string): Promise<User | null> {
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>(COLLECTIONS.USERS);

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    return user ? sanitizeUser(user) : null;
  }

  static async updateUserStats(userId: string, statsUpdate: Partial<User['stats']>): Promise<void> {
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>(COLLECTIONS.USERS);

    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          ...Object.keys(statsUpdate).reduce((acc, key) => {
            acc[`stats.${key}`] = statsUpdate[key as keyof User['stats']];
            return acc;
          }, {} as any),
          updatedAt: new Date()
        }
      }
    );
  }

  static async updateUserSettings(userId: string, settingsUpdate: Partial<User['settings']>): Promise<void> {
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>(COLLECTIONS.USERS);

    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          ...Object.keys(settingsUpdate).reduce((acc, key) => {
            acc[`settings.${key}`] = settingsUpdate[key as keyof User['settings']];
            return acc;
          }, {} as any),
          updatedAt: new Date()
        }
      }
    );
  }

  static async incrementUserStreak(userId: string): Promise<void> {
    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>(COLLECTIONS.USERS);

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) return;

    const newStreak = user.stats.currentStreak + 1;
    const longestStreak = Math.max(user.stats.longestStreak, newStreak);

    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          'stats.currentStreak': newStreak,
          'stats.longestStreak': longestStreak,
          updatedAt: new Date()
        }
      }
    );
  }
}

// 需要导入 ObjectId
import { ObjectId } from 'mongodb';
