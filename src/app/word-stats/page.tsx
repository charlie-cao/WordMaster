'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BookOpen, 
  Target, 
  TrendingUp,
  Tag,
  BarChart3,
  PieChart,
  Database,
  Sparkles
} from 'lucide-react';

interface WordCategories {
  total: number;
  difficulties: {
    easy: number;
    medium: number;
    hard: number;
  };
  tags: Array<{
    name: string;
    count: number;
  }>;
}

export default function WordStatsPage() {
  const [categories, setCategories] = useState<WordCategories | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/words/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">加载单词统计中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <Link href="/words">
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回单词库
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                单词库统计
              </h1>
              <p className="text-gray-600">探索我们丰富的单词数据库</p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 总体统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">总单词数</p>
                  <p className="text-4xl font-bold text-gray-900">
                    {categories?.total || 0}
                  </p>
                  <p className="text-sm text-green-600 mt-1">持续增长中</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">简单单词</p>
                  <p className="text-4xl font-bold text-green-600">
                    {categories?.difficulties?.easy || 0}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">适合初学者</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">中等单词</p>
                  <p className="text-4xl font-bold text-yellow-600">
                    {categories?.difficulties?.medium || 0}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">进阶学习</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">困难单词</p>
                  <p className="text-4xl font-bold text-red-600">
                    {categories?.difficulties?.hard || 0}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">挑战级别</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
                  <Sparkles className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 难度分布 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <PieChart className="h-6 w-6 text-blue-600" />
                  难度分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories && (
                    <>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">简单</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{categories.difficulties.easy}</div>
                          <div className="text-sm text-gray-600">
                            {Math.round((categories.difficulties.easy / categories.total) * 100)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">中等</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-600">{categories.difficulties.medium}</div>
                          <div className="text-sm text-gray-600">
                            {Math.round((categories.difficulties.medium / categories.total) * 100)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                          <span className="font-medium text-gray-900">困难</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">{categories.difficulties.hard}</div>
                          <div className="text-sm text-gray-600">
                            {Math.round((categories.difficulties.hard / categories.total) * 100)}%
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 标签统计 */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Tag className="h-6 w-6 text-purple-600" />
                  热门标签
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories?.tags.slice(0, 10).map((tag, index) => (
                    <div key={tag.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded-full border">
                          #{index + 1}
                        </span>
                        <span className="font-medium text-gray-900">{tag.name}</span>
                      </div>
                      <span className="text-sm font-bold text-blue-600">{tag.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="h-6 w-6 text-green-600" />
                快速操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/words?difficulty=easy">
                  <Button className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <BookOpen className="h-5 w-5 mr-2" />
                    浏览简单单词
                  </Button>
                </Link>
                <Link href="/words?difficulty=medium">
                  <Button className="w-full h-16 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    浏览中等单词
                  </Button>
                </Link>
                <Link href="/words?difficulty=hard">
                  <Button className="w-full h-16 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <Sparkles className="h-5 w-5 mr-2" />
                    挑战困难单词
                  </Button>
                </Link>
                <Link href="/study">
                  <Button className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <Target className="h-5 w-5 mr-2" />
                    开始学习
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
