'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Share2, 
  Download, 
  Copy, 
  MessageCircle,
  Send,
  ExternalLink,
  Trophy,
  Target,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface ShareCardProps {
  type: 'achievement' | 'progress' | 'streak' | 'milestone';
  data: {
    title: string;
    description: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    background: string;
  };
  onShare?: (platform: string) => void;
}

export function ShareCard({ type, data, onShare }: ShareCardProps) {
  const [isSharing, setIsSharing] = useState(false);

  const generateShareText = () => {
    const texts = {
      achievement: `🏆 我在WordMaster获得了新成就：${data.title}！\n${data.description}\n一起来挑战英语学习吧！`,
      progress: `📈 WordMaster学习进展：${data.title}\n${data.description}\n科学记忆法真的很有效！`,
      streak: `🔥 我在WordMaster连续学习${data.value}天了！\n坚持就是胜利，一起来学英语吧！`,
      milestone: `🎯 达成新里程碑：${data.title}\n${data.description}\n感谢WordMaster的科学学习方法！`
    };
    
    return texts[type] || texts.achievement;
  };

  const handleShare = async (platform: string) => {
    setIsSharing(true);
    
    const shareText = generateShareText();
    const shareUrl = `${window.location.origin}/auth/register`;
    
    try {
      switch (platform) {
        case 'copy':
          await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
          if (window.toast) {
            window.toast({ message: '分享内容已复制', type: 'success' });
          }
          break;
          
        case 'weibo':
          const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
          window.open(weiboUrl, '_blank');
          break;
          
        case 'qq':
          const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
          window.open(qqUrl, '_blank');
          break;
          
        default:
          if (window.toast) {
            window.toast({ message: '请手动分享到对应平台', type: 'info' });
          }
      }
      
      // 记录分享行为
      if (onShare) {
        onShare(platform);
      }
      
    } catch (error) {
      console.error('Share failed:', error);
      if (window.toast) {
        window.toast({ message: '分享失败，请重试', type: 'error' });
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* 分享卡片预览 */}
      <Card className={`${data.background} border-0 shadow-xl mb-6 transform transition-all duration-300`}>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 ${data.color} rounded-3xl flex items-center justify-center shadow-lg`}>
              {data.icon}
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{data.title}</h2>
          <p className="text-gray-600 mb-4">{data.description}</p>
          
          <div className="text-4xl font-bold text-blue-600 mb-4">{data.value}</div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium">WordMaster</span>
          </div>
        </CardContent>
      </Card>

      {/* 分享按钮 */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleShare('copy')}
            disabled={isSharing}
            className="h-12 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Copy className="h-4 w-4 mr-2" />
            复制内容
          </Button>
          <Button
            onClick={() => handleShare('weibo')}
            disabled={isSharing}
            className="h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="h-4 w-4 mr-2" />
            分享微博
          </Button>
        </div>
        
        <Button
          onClick={() => handleShare('wechat')}
          disabled={isSharing}
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          分享到微信
        </Button>
        
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => handleShare('download')}
            className="text-gray-600 hover:text-gray-900"
          >
            <Download className="h-4 w-4 mr-2" />
            保存图片
          </Button>
        </div>
      </div>
    </div>
  );
}

// 预设的分享卡片数据
export const shareCardTemplates = {
  dailyGoal: {
    title: '今日目标达成',
    description: '坚持学习，每天进步一点点',
    value: '20/20',
    icon: <Target className="h-10 w-10 text-white" />,
    color: 'bg-green-600',
    background: 'bg-gradient-to-br from-green-50 to-emerald-50'
  },
  
  weekStreak: {
    title: '连续学习7天',
    description: '养成良好的学习习惯',
    value: '7天',
    icon: <Calendar className="h-10 w-10 text-white" />,
    color: 'bg-blue-600',
    background: 'bg-gradient-to-br from-blue-50 to-indigo-50'
  },
  
  wordsMastered: {
    title: '掌握100个单词',
    description: '词汇量稳步提升中',
    value: '100',
    icon: <Trophy className="h-10 w-10 text-white" />,
    color: 'bg-yellow-600',
    background: 'bg-gradient-to-br from-yellow-50 to-orange-50'
  },
  
  accuracyHigh: {
    title: '学习正确率95%',
    description: '学习效果显著提升',
    value: '95%',
    icon: <TrendingUp className="h-10 w-10 text-white" />,
    color: 'bg-purple-600',
    background: 'bg-gradient-to-br from-purple-50 to-pink-50'
  }
};
