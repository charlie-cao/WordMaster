'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { 
  BookOpen, 
  LogOut,
  Settings,
  BarChart3,
  Library
} from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
}

export function Header({ 
  title = "WordMaster", 
  subtitle = "欢迎回来！继续你的学习之旅",
  showBackButton = false,
  backHref = "/dashboard",
  backText = "返回"
}: HeaderProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // 显示成功通知
      if (typeof window !== 'undefined' && window.toast) {
        window.toast({
          message: '退出登录成功',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // 显示错误通知
      if (typeof window !== 'undefined' && window.toast) {
        window.toast({
          message: '退出登录失败，请重试',
          type: 'error'
        });
      }
      // 即使API失败，也强制跳转到首页
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  return (
    <header className="relative z-10 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link href={backHref}>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-300">
                  ← {backText}
                </Button>
              </Link>
            )}
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-gray-600">
                {subtitle.includes('欢迎回来') && user?.username 
                  ? `欢迎回来, ${user.username}！继续你的学习之旅`
                  : subtitle
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/stats">
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                <BarChart3 className="h-4 w-4 mr-1" />
                统计
              </Button>
            </Link>
            <Link href="/words">
              <Button variant="outline" className="hover:bg-green-50 hover:border-green-300 transition-all duration-300">
                <Library className="h-4 w-4 mr-1" />
                词库
              </Button>
            </Link>
            <Button variant="outline" className="hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
              <Settings className="h-4 w-4 mr-1" />
              设置
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-1" />
              退出
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
