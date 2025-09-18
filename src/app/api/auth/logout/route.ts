import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // 创建响应
    const response = NextResponse.json<ApiResponse>({
      success: true,
      message: '退出登录成功'
    });

    // 清除HTTP-only cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // 立即过期
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '退出登录失败'
    }, { status: 500 });
  }
}
