'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 检查用户认证状态
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 退出登录
  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
        // 清除本地存储的用户数据
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
          localStorage.removeItem('auth-token');
        }
        // 跳转到首页
        router.push('/');
      } else {
        throw new Error(data.error || '退出登录失败');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  // 登录成功后设置用户信息
  const setAuthUser = (userData: User) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  useEffect(() => {
    // 初始化时检查认证状态
    checkAuth();
  }, []);

  return {
    user,
    isLoading,
    logout,
    setAuthUser,
    checkAuth
  };
}
