'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { 
  Coins, 
  Gift, 
  Star, 
  Crown,
  Zap,
  Trophy,
  Users,
  BookOpen,
  Calendar,
  Target
} from 'lucide-react';

interface PointsData {
  totalPoints: number;
  availablePoints: number;
  transactions: Array<{
    type: 'earn' | 'spend';
    amount: number;
    reason: string;
    timestamp: Date;
  }>;
}

export default function PointsPage() {
  const [pointsData, setPointsData] = useState<PointsData>({
    totalPoints: 150,
    availablePoints: 120,
    transactions: [
      { type: 'earn', amount: 50, reason: '邀请好友注册', timestamp: new Date() },
      { type: 'earn', amount: 20, reason: '连续学习7天', timestamp: new Date() },
      { type: 'earn', amount: 30, reason: '完成每日目标', timestamp: new Date() },
      { type: 'spend', amount: 30, reason: '兑换学习徽章', timestamp: new Date() }
    ]
  });

  const rewardItems = [
    {
      id: 1,
      name: '学习徽章',
      description: '个性化学习成就徽章',
      points: 30,
      icon: <Star className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-500',
      available: true
    },
    {
      id: 2,
      name: '高级主题',
      description: '解锁更多界面主题',
      points: 50,
      icon: <Crown className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-500',
      available: true
    },
    {
      id: 3,
      name: '专属头像框',
      description: '彰显学习者身份',
      points: 80,
      icon: <Trophy className="h-6 w-6" />,
      color: 'from-blue-500 to-indigo-500',
      available: true
    },
    {
      id: 4,
      name: '学习加速器',
      description: '双倍学习经验值',
      points: 100,
      icon: <Zap className="h-6 w-6" />,
      color: 'from-green-500 to-teal-500',
      available: true
    },
    {
      id: 5,
      name: '专属称号',
      description: '"单词大师"专属称号',
      points: 200,
      icon: <Crown className="h-6 w-6" />,
      color: 'from-red-500 to-pink-500',
      available: false
    }
  ];

  const handleExchange = (item: typeof rewardItems[0]) => {
    if (pointsData.availablePoints >= item.points) {
      setPointsData(prev => ({
        ...prev,
        availablePoints: prev.availablePoints - item.points,
        transactions: [
          {
            type: 'spend',
            amount: item.points,
            reason: `兑换${item.name}`,
            timestamp: new Date()
          },
          ...prev.transactions
        ]
      }));

      if (window.toast) {
        window.toast({
          message: `成功兑换${item.name}！`,
          type: 'success'
        });
      }
    } else {
      if (window.toast) {
        window.toast({
          message: '积分不足，继续学习获得更多积分吧！',
          type: 'warning'
        });
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <Header 
        title="积分商城"
        subtitle={`当前可用积分: ${pointsData.availablePoints}`}
        showBackButton={true}
        backHref="/dashboard"
        backText="返回仪表板"
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 积分概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">总积分</p>
                  <p className="text-3xl font-bold text-blue-600">{pointsData.totalPoints}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">可用积分</p>
                  <p className="text-3xl font-bold text-green-600">{pointsData.availablePoints}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">获取更多积分</p>
                <div className="space-y-2">
                  <Link href="/invite">
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="h-4 w-4 mr-1" />
                      邀请好友 +50
                    </Button>
                  </Link>
                  <Link href="/study">
                    <Button variant="outline" size="sm" className="w-full">
                      <BookOpen className="h-4 w-4 mr-1" />
                      每日学习 +10
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 积分商城 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Gift className="h-6 w-6 text-purple-600" />
                  积分商城
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {rewardItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        item.available && pointsData.availablePoints >= item.points
                          ? 'border-blue-200 bg-blue-50 hover:shadow-lg'
                          : 'border-gray-200 bg-gray-50 opacity-75'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-blue-600 font-bold">
                          <Coins className="h-4 w-4" />
                          <span>{item.points}</span>
                        </div>
                        <Button
                          onClick={() => handleExchange(item)}
                          disabled={!item.available || pointsData.availablePoints < item.points}
                          size="sm"
                          className={`${
                            item.available && pointsData.availablePoints >= item.points
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : 'bg-gray-400'
                          } text-white rounded-lg transition-all duration-300`}
                        >
                          {pointsData.availablePoints >= item.points ? '兑换' : '积分不足'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 积分记录 */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Coins className="h-6 w-6 text-yellow-600" />
                  积分记录
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {pointsData.transactions.map((transaction, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        transaction.type === 'earn' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          transaction.type === 'earn' ? 'bg-green-600' : 'bg-red-600'
                        }`}>
                          <span className="text-white text-xs font-bold">
                            {transaction.type === 'earn' ? '+' : '-'}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{transaction.reason}</div>
                          <div className="text-xs text-gray-500">
                            {transaction.timestamp.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'earn' ? '+' : '-'}{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 积分获取指南 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="h-6 w-6 text-green-600" />
                  获取积分
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">每日学习</span>
                    <span className="text-blue-600 font-bold">+10</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <span className="text-gray-700">邀请好友</span>
                    <span className="text-green-600 font-bold">+50</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">连续学习7天</span>
                    <span className="text-purple-600 font-bold">+30</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700">完成测验</span>
                    <span className="text-yellow-600 font-bold">+20</span>
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
