import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { UserService } from '@/lib/services/userService';
import { User } from '@/types';

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET not configured');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  try {
    // 从cookie或Authorization header获取token
    let token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return null;
    }

    // 验证token
    const payload = await verifyToken(token);
    
    // 获取用户信息
    const user = await UserService.getUserById(payload.userId);
    return user;

  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export function requireAuth(handler: (request: NextRequest, user: User) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: '请先登录'
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return handler(request, user);
  };
}

export async function generateToken(user: User): Promise<string> {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET not configured');
  }

  return jwt.sign(
    { 
      userId: user._id,
      email: user.email 
    },
    jwtSecret,
    { expiresIn: '7d' }
  );
}
