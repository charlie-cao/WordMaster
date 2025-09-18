'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  Award,
  Play,
  RotateCcw,
  PlusCircle,
  Coins
} from 'lucide-react';

export default function DashboardPage() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch('/api/words?limit=5');
      const data = await response.json();
      if (data.success) {
        setWords(data.data.words);
      }
    } catch (error) {
      console.error('Failed to fetch words:', error);
    } finally {
      setLoading(false);
    }
  };


  const mockUserStats = {
    wordsLearned: 125,
    currentStreak: 7,
    studyTime: 45,
    accuracy: 85,
    points: 150
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatsCard
            title="已学单词"
            value={mockUserStats.wordsLearned}
            icon={<BookOpen className="h-6 w-6" />}
            color="blue"
          />
          <StatsCard
            title="连续天数"
            value={mockUserStats.currentStreak}
            icon={<Calendar className="h-6 w-6" />}
            color="green"
            suffix="天"
          />
          <StatsCard
            title="今日学习"
            value={mockUserStats.studyTime}
            icon={<Clock className="h-6 w-6" />}
            color="purple"
            suffix="分钟"
          />
          <StatsCard
            title="正确率"
            value={mockUserStats.accuracy}
            icon={<Target className="h-6 w-6" />}
            color="orange"
            suffix="%"
          />
          <Link href="/points">
            <StatsCard
              title="我的积分"
              value={mockUserStats.points}
              icon={<Coins className="h-6 w-6" />}
              color="purple"
            />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Start */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Play className="h-6 w-6 text-blue-600" />
                  快速开始
                </CardTitle>
                <CardDescription className="text-gray-600">选择你的学习模式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/study">
                    <QuickActionCard
                      title="每日学习"
                      description="学习新单词"
                      icon={<Brain className="h-8 w-8 text-blue-600" />}
                      onClick={() => {}}
                    />
                  </Link>
                  <QuickActionCard
                    title="复习模式"
                    description="复习已学单词"
                    icon={<RotateCcw className="h-8 w-8 text-green-600" />}
                    onClick={() => console.log('Review clicked')}
                  />
                  <Link href="/invite">
                    <QuickActionCard
                      title="邀请好友"
                      description="分享学习，获得奖励"
                      icon={<Award className="h-8 w-8 text-purple-600" />}
                      onClick={() => {}}
                    />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Words */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xl">
                    <BookOpen className="h-6 w-6 text-green-600" />
                    最近单词
                  </span>
                  <Link href="/words">
                    <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300 transition-all duration-300">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      查看更多
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {words.slice(0, 3).map((word: any) => (
                      <WordCard key={word._id} word={word} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Progress & Goals */}
          <div className="space-y-6">
            {/* Today's Goal */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="h-6 w-6 text-purple-600" />
                  今日目标
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>学习进度</span>
                      <span>12/20 单词</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <Link href="/study">
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                      继续学习
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  学习记录
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">7</div>
                    <div className="text-sm text-gray-600">连续学习天数</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {[1, 1, 1, 1, 1, 1, 1].map((active, i) => (
                      <div
                        key={i}
                        className={`h-6 rounded ${
                          active ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    过去7天的学习情况
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Award className="h-6 w-6 text-yellow-600" />
                  最新成就
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold">学习新星</div>
                    <div className="text-sm text-gray-600">连续学习7天</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ 
  title, 
  value, 
  icon, 
  color, 
  suffix = '' 
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  suffix?: string;
}) {
  const colorClasses = {
    blue: 'text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    green: 'text-green-600 bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    purple: 'text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    orange: 'text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <p className="text-3xl font-bold text-gray-900">
              {value}{suffix}
            </p>
          </div>
          <div className={`p-4 rounded-2xl ${colorClasses[color]} shadow-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({
  title,
  description,
  icon,
  onClick
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Card className="cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group" onClick={onClick}>
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function WordCard({ word }: { word: any }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-blue-200">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-lg font-bold text-gray-900">{word.word}</div>
          <div className="text-sm text-gray-500">{word.pronunciation}</div>
        </div>
        <div className="text-sm text-gray-700">{word.definitions[0]?.meaning}</div>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        word.difficulty === 'easy' ? 'bg-green-100 text-green-700 border border-green-200' :
        word.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
        'bg-red-100 text-red-700 border border-red-200'
      }`}>
        {word.difficulty === 'easy' ? '简单' : word.difficulty === 'medium' ? '中等' : '困难'}
      </div>
    </div>
  );
}
