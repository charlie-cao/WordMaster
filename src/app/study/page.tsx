'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { 
  ArrowLeft, 
  Volume2, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

interface Word {
  _id: string;
  word: string;
  pronunciation: string;
  definitions: Array<{
    partOfSpeech: string;
    meaning: string;
    example: string;
    exampleTranslation: string;
  }>;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function StudyPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studyStats, setStudyStats] = useState({
    correct: 0,
    total: 0
  });

  useEffect(() => {
    fetchRandomWords();
  }, []);

  const fetchRandomWords = async () => {
    try {
      const response = await fetch('/api/words/random?count=10');
      const data = await response.json();
      if (data.success) {
        setWords(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch words:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentWord = words[currentIndex];

  const handleAnswer = (isCorrect: boolean) => {
    setStudyStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    // 延迟后自动进入下一个单词
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setShowAnswer(false);
      } else {
        // 学习完成，可以显示结果或重新开始
        alert(`学习完成！正确率: ${Math.round(((studyStats.correct + (isCorrect ? 1 : 0)) / (studyStats.total + 1)) * 100)}%`);
      }
    }, 1500);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const playPronunciation = () => {
    if (currentWord) {
      // 使用Web Speech API播放发音
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载单词中...</p>
        </div>
      </div>
    );
  }

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">没有可学习的单词</h2>
            <p className="text-gray-600 mb-4">请稍后再试或联系管理员</p>
            <Link href="/dashboard">
              <Button>返回仪表板</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <Header 
        title="单词学习"
        subtitle={`进度: ${currentIndex + 1} / ${words.length} | 正确率: ${studyStats.total > 0 ? Math.round((studyStats.correct / studyStats.total) * 100) : 0}%`}
        showBackButton={true}
        backHref="/dashboard"
        backText="返回仪表板"
      />

      {/* Study Card */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center justify-center gap-6 mb-6">
                <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {currentWord.word}
                </h2>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={playPronunciation}
                  className="text-blue-600 hover:text-purple-600 hover:bg-blue-50 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                >
                  <Volume2 className="h-6 w-6" />
                </Button>
              </div>
              <p className="text-xl text-gray-600 mb-6 font-medium">{currentWord.pronunciation}</p>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${
                currentWord.difficulty === 'easy' ? 'bg-green-100 text-green-700 border-green-200' :
                currentWord.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                'bg-red-100 text-red-700 border-red-200'
              }`}>
                {currentWord.difficulty === 'easy' ? '简单' : currentWord.difficulty === 'medium' ? '中等' : '困难'}
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {!showAnswer ? (
                <div className="text-center py-12">
                  <p className="text-2xl text-gray-700 mb-8 font-medium">
                    你知道这个单词的意思吗？
                  </p>
                  <Button 
                    onClick={toggleAnswer} 
                    size="lg"
                    className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    显示答案
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Definitions */}
                  <div className="space-y-6">
                    {currentWord.definitions.map((def, index) => (
                      <div key={index} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                            {def.partOfSpeech}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-4">{def.meaning}</p>
                        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                          <p className="text-gray-700 italic text-lg mb-2">"{def.example}"</p>
                          <p className="text-gray-600">"{def.exampleTranslation}"</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Answer Buttons */}
                  <div className="flex gap-6 justify-center pt-6">
                    <Button
                      onClick={() => handleAnswer(false)}
                      size="lg"
                      className="flex-1 max-w-xs h-14 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      不认识
                    </Button>
                    <Button
                      onClick={() => handleAnswer(true)}
                      size="lg"
                      className="flex-1 max-w-xs h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      认识
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(prev => prev - 1);
                  setShowAnswer(false);
                }
              }}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 rounded-xl shadow-md disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一个
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setShowAnswer(false);
              }}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-600 transition-all duration-300 rounded-xl shadow-md"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重新开始
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                if (currentIndex < words.length - 1) {
                  setCurrentIndex(prev => prev + 1);
                  setShowAnswer(false);
                }
              }}
              disabled={currentIndex === words.length - 1}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 rounded-xl shadow-md disabled:opacity-50"
            >
              下一个
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
