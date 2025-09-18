'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { 
  Users, 
  Gift, 
  Share2, 
  Copy, 
  QrCode,
  TrendingUp,
  Award,
  ExternalLink,
  MessageCircle,
  Send
} from 'lucide-react';

interface ReferralStats {
  referralCode: string;
  totalInvites: number;
  successfulInvites: number;
  totalRewards: number;
  pendingInvites: number;
}

export default function InvitePage() {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchReferralStats();
  }, []);

  const fetchReferralStats = async () => {
    try {
      const response = await fetch('/api/referral');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch referral stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = async () => {
    if (!stats) return;
    
    const referralLink = `${window.location.origin}/auth/register?ref=${stats.referralCode}`;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess(true);
      
      if (window.toast) {
        window.toast({
          message: '推荐链接已复制到剪贴板',
          type: 'success'
        });
      }
      
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      if (window.toast) {
        window.toast({
          message: '复制失败，请手动复制',
          type: 'error'
        });
      }
    }
  };

  const shareToWechat = () => {
    if (!stats) return;
    
    const text = `我在使用WordMaster学英语，效果很不错！一起来学习吧 🎯`;
    const url = `${window.location.origin}/auth/register?ref=${stats.referralCode}`;
    
    // 微信分享（实际项目中需要接入微信SDK）
    if (window.toast) {
      window.toast({
        message: '请手动分享到微信群或朋友圈',
        type: 'info'
      });
    }
  };

  const shareToWeibo = () => {
    if (!stats) return;
    
    const text = `我在使用WordMaster学英语，基于科学记忆算法，效果很棒！推荐给大家 📚`;
    const url = `${window.location.origin}/auth/register?ref=${stats.referralCode}`;
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
    
    window.open(weiboUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">加载推荐信息中...</p>
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

      <Header 
        title="邀请好友"
        subtitle="分享WordMaster，一起进步成长"
        showBackButton={true}
        backHref="/dashboard"
        backText="返回仪表板"
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 推荐统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">总邀请数</p>
                  <p className="text-3xl font-bold text-blue-600">{stats?.totalInvites || 0}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">成功邀请</p>
                  <p className="text-3xl font-bold text-green-600">{stats?.successfulInvites || 0}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">获得积分</p>
                  <p className="text-3xl font-bold text-purple-600">{stats?.totalRewards || 0}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
                  <Gift className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">待确认</p>
                  <p className="text-3xl font-bold text-orange-600">{stats?.pendingInvites || 0}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 推荐链接 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Share2 className="h-6 w-6 text-blue-600" />
                  我的推荐链接
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 推荐码 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    我的推荐码
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={stats?.referralCode || ''}
                      readOnly
                      className="flex-1 bg-gray-50 font-mono text-lg text-center"
                    />
                    <Button
                      onClick={() => {
                        if (stats?.referralCode) {
                          navigator.clipboard.writeText(stats.referralCode);
                          if (window.toast) {
                            window.toast({ message: '推荐码已复制', type: 'success' });
                          }
                        }
                      }}
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* 推荐链接 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    推荐链接
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={stats ? `${window.location.origin}/auth/register?ref=${stats.referralCode}` : ''}
                      readOnly
                      className="flex-1 bg-gray-50 text-sm"
                    />
                    <Button
                      onClick={copyReferralLink}
                      className={`${copySuccess ? 'bg-green-600' : 'bg-blue-600'} hover:bg-blue-700 transition-all duration-300`}
                    >
                      {copySuccess ? '已复制' : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* 分享按钮 */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={shareToWechat}
                    className="h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    分享到微信
                  </Button>
                  <Button
                    onClick={shareToWeibo}
                    className="h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    分享到微博
                  </Button>
                </div>

                {/* 奖励说明 */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-yellow-600" />
                    邀请奖励
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• 🎁 每成功邀请1位好友注册，您可获得 <span className="font-bold text-blue-600">50积分</span></p>
                    <p>• 🏆 好友完成首次学习，双方各获得 <span className="font-bold text-green-600">额外20积分</span></p>
                    <p>• 💎 积分可兑换高级功能、学习徽章等奖励</p>
                    <p>• 🔥 邀请越多，奖励越丰厚！</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 推荐排行榜 */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Award className="h-6 w-6 text-yellow-600" />
                  推荐排行榜
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 模拟排行榜数据 */}
                  {[
                    { rank: 1, name: '学习达人', invites: 28, reward: '🥇' },
                    { rank: 2, name: '英语高手', invites: 22, reward: '🥈' },
                    { rank: 3, name: '单词王者', invites: 18, reward: '🥉' },
                    { rank: 4, name: '知识分享者', invites: 15, reward: '🏆' },
                    { rank: 5, name: '学习先锋', invites: 12, reward: '⭐' }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{user.reward}</span>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">#{user.rank}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{user.invites}</div>
                        <div className="text-xs text-gray-500">邀请数</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      #{stats?.successfulInvites ? Math.max(6, 20 - stats.successfulInvites) : '?'}
                    </div>
                    <div className="text-sm text-gray-600">您的排名</div>
                    <p className="text-xs text-gray-500 mt-2">继续邀请好友提升排名！</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 分享技巧 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <QrCode className="h-6 w-6 text-green-600" />
                  分享技巧
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>分享到学习群，强调科学记忆算法</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">2.</span>
                    <span>展示你的学习成果和进步</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">3.</span>
                    <span>邀请室友、同学一起学习</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">4.</span>
                    <span>在社交媒体分享学习心得</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 分享模板 */}
        <div className="mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageCircle className="h-6 w-6 text-green-600" />
                分享文案模板
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">朋友圈文案</h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      最近在用WordMaster学英语，基于艾宾浩斯遗忘曲线的科学记忆方法，效果真的很不错！📚✨
                      <br /><br />
                      界面设计很现代化，学习过程也很有趣，推荐给同样想提升英语的朋友们~ 🎯
                      <br /><br />
                      一起来挑战吧！ 
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      const text = `最近在用WordMaster学英语，基于艾宾浩斯遗忘曲线的科学记忆方法，效果真的很不错！📚✨\n\n界面设计很现代化，学习过程也很有趣，推荐给同样想提升英语的朋友们~ 🎯\n\n一起来挑战吧！\n\n${window.location.origin}/auth/register?ref=${stats?.referralCode}`;
                      navigator.clipboard.writeText(text);
                      if (window.toast) {
                        window.toast({ message: '文案已复制', type: 'success' });
                      }
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    复制文案
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">学习群文案</h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      给大家推荐一个很棒的背单词应用 - WordMaster 🎓
                      <br /><br />
                      特点：
                      <br />• 基于科学记忆算法，效率提升95%
                      <br />• 现代化UI设计，学习体验很棒
                      <br />• 涵盖CET4/6、托福等各类词汇
                      <br />• 完全免费使用
                      <br /><br />
                      一起来试试吧！
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      const text = `给大家推荐一个很棒的背单词应用 - WordMaster 🎓\n\n特点：\n• 基于科学记忆算法，效率提升95%\n• 现代化UI设计，学习体验很棒\n• 涵盖CET4/6、托福等各类词汇\n• 完全免费使用\n\n一起来试试吧！\n\n${window.location.origin}/auth/register?ref=${stats?.referralCode}`;
                      navigator.clipboard.writeText(text);
                      if (window.toast) {
                        window.toast({ message: '文案已复制', type: 'success' });
                      }
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    复制文案
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
