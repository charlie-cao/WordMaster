import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { ApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '未登录'
      }, { status: 401 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get current user error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: '获取用户信息失败'
    }, { status: 500 });
  }
}
