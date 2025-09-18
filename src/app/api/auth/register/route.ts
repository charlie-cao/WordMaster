import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/userService';
import { isValidEmail, isValidPassword } from '@/lib/utils';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, password, confirmPassword } = body;

    // 验证必填字段
    if (!email || !username || !password || !confirmPassword) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '请填写所有必填字段'
      }, { status: 400 });
    }

    // 验证邮箱格式
    if (!isValidEmail(email)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '邮箱格式不正确'
      }, { status: 400 });
    }

    // 验证密码强度
    if (!isValidPassword(password)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '密码至少8位，且包含字母和数字'
      }, { status: 400 });
    }

    // 验证密码确认
    if (password !== confirmPassword) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '两次输入的密码不一致'
      }, { status: 400 });
    }

    // 验证用户名长度
    if (username.length < 2 || username.length > 20) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '用户名长度应在2-20个字符之间'
      }, { status: 400 });
    }

    // 创建用户
    const user = await UserService.createUser({
      email: email.toLowerCase(),
      username,
      password
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: user,
      message: '注册成功'
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    const errorMessage = error instanceof Error ? error.message : '注册失败';
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}
