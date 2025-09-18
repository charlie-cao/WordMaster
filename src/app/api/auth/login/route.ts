import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/userService';
import { isValidEmail } from '@/lib/utils';
import { ApiResponse } from '@/types';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 验证必填字段
    if (!email || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '请填写邮箱和密码'
      }, { status: 400 });
    }

    // 验证邮箱格式
    if (!isValidEmail(email)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '邮箱格式不正确'
      }, { status: 400 });
    }

    // 验证用户凭据
    const user = await UserService.authenticateUser(email.toLowerCase(), password);

    // 生成JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured');
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // 创建响应
    const response = NextResponse.json<ApiResponse>({
      success: true,
      data: { user, token },
      message: '登录成功'
    });

    // 设置HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    
    const errorMessage = error instanceof Error ? error.message : '登录失败';
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: errorMessage
    }, { status: 401 });
  }
}
