'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressChart, StudyHeatmap } from '@/components/charts/ProgressChart';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  BookOpen,
  Clock,
  Zap
} from 'lucide-react';

export default function StatsPage() {
  const mockStats = {
    totalWords: 156,
    masteredWords: 89,
    currentStreak: 12,
    longestStreak: 28,
    totalStudyTime: 1240, // 分钟
    averageAccuracy: 87,
    wordsThisWeek: 45,
    studyDaysThisMonth: 18,
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`;
  };

  const achievements = [
    { id: 1, name: '学习新星', description: '连续学习7天', icon: '🌟', unlocked: true },
    { id: 2, name: '单词大师', description: '掌握100个单词', icon: '📚', unlocked: true },
    { id: 3, name: '坚持不懈', description: '连续学习30天', icon: '🔥', unlocked: false },
    { id: 4, name: '精准射手', description: '正确率达到95%', icon: '🎯', unlocked: false },
    { id: 5, name: '时间管理者', description: '累计学习20小时', icon: '⏰', unlocked: true },
    { id: 6, name: '挑战者', description: '完成100次测验', icon: '⚡', unlocked: false },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <Header 
        title="学习统计"
        subtitle="查看你的学习进度和成就"
        showBackButton={true}
        backHref="/dashboard"
        backText="返回仪表板"
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 核心统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="总单词数"
            value={mockStats.totalWords}
            icon={<BookOpen className="h-6 w-6" />}
            color="blue"
            subtitle={`已掌握 ${mockStats.masteredWords}`}
          />
          <StatCard
            title="当前连击"
            value={mockStats.currentStreak}
            icon={<Calendar className="h-6 w-6" />}
            color="green"
            suffix="天"
            subtitle={`最长 ${mockStats.longestStreak} 天`}
          />
          <StatCard
            title="学习时间"
            value={formatTime(mockStats.totalStudyTime)}
            icon={<Clock className="h-6 w-6" />}
            color="purple"
            subtitle="累计学习时间"
            isTime={true}
          />
          <StatCard
            title="平均正确率"
            value={mockStats.averageAccuracy}
            icon={<Target className="h-6 w-6" />}
            color="orange"
            suffix="%"
            subtitle="总体表现"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧 - 图表 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 学习进度图表 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  学习趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressChart type="line" title="过去7天学习情况" />
              </CardContent>
            </Card>

            {/* 难度分布 */}
            <Card>
              <CardHeader>
                <CardTitle>单词难度分布</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressChart type="pie" title="已学单词难度分析" height={250} />
              </CardContent>
            </Card>

            {/* 学习热力图 */}
            <Card>
              <CardHeader>
                <CardTitle>学习热力图</CardTitle>
              </CardHeader>
              <CardContent>
                <StudyHeatmap />
              </CardContent>
            </Card>
          </div>

          {/* 右侧 - 成就和详细统计 */}
          <div className="space-y-6">
            {/* 本周统计 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  本周表现
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">学习单词</span>
                  <span className="font-semibold">{mockStats.wordsThisWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">学习天数</span>
                  <span className="font-semibold">7/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">平均每日</span>
                  <span className="font-semibold">{Math.round(mockStats.wordsThisWeek / 7)} 个</span>
                </div>
              </CardContent>
            </Card>

            {/* 本月统计 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  本月表现
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">学习天数</span>
                  <span className="font-semibold">{mockStats.studyDaysThisMonth}/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${(mockStats.studyDaysThisMonth / 30) * 100}%`}}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  坚持率: {Math.round((mockStats.studyDaysThisMonth / 30) * 100)}%
                </p>
              </CardContent>
            </Card>

            {/* 成就系统 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  成就徽章
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg border text-center ${
                        achievement.unlocked
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-sm font-semibold">{achievement.name}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                      {achievement.unlocked && (
                        <div className="text-xs text-green-600 mt-1">✓ 已获得</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 快速操作 */}
            <Card>
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/study">
                  <Button className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    开始学习
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  导出报告
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  color, 
  suffix = '', 
  subtitle,
  isTime = false
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  suffix?: string;
  subtitle?: string;
  isTime?: boolean;
}) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    orange: 'text-orange-600 bg-orange-100'
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold">
              {isTime ? value : `${value}${suffix}`}
            </p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
