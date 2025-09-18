'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Volume2, 
  Filter,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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
  frequency: number;
  tags: string[];
}

interface WordsResponse {
  words: Word[];
  total: number;
  page: number;
  totalPages: number;
}

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchWords();
  }, [currentPage, selectedDifficulty]);

  const fetchWords = async () => {
    setLoading(true);
    try {
      let url = `/api/words?page=${currentPage}&limit=10`;
      
      if (selectedDifficulty !== 'all') {
        url += `&difficulty=${selectedDifficulty}`;
      }
      
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        const wordsData: WordsResponse = data.data;
        setWords(wordsData.words);
        setTotalPages(wordsData.totalPages);
        setTotal(wordsData.total);
      }
    } catch (error) {
      console.error('Failed to fetch words:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchWords();
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1);
  };

  const playPronunciation = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
        title="单词库"
        subtitle={`浏览和管理你的单词 | 共 ${total} 个单词`}
        showBackButton={true}
        backHref="/dashboard"
        backText="返回仪表板"
      />

      <div className="container mx-auto px-4 py-8">
        {/* 搜索和筛选 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索单词或释义..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch}>搜索</Button>
              </div>

              {/* 难度筛选 */}
              <div className="flex gap-2">
                <Button
                  variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDifficultyChange('all')}
                >
                  全部
                </Button>
                <Button
                  variant={selectedDifficulty === 'easy' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDifficultyChange('easy')}
                  className="text-green-600"
                >
                  简单
                </Button>
                <Button
                  variant={selectedDifficulty === 'medium' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDifficultyChange('medium')}
                  className="text-yellow-600"
                >
                  中等
                </Button>
                <Button
                  variant={selectedDifficulty === 'hard' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDifficultyChange('hard')}
                  className="text-red-600"
                >
                  困难
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 单词列表 */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : words.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">没有找到单词</h3>
              <p className="text-gray-600">尝试调整搜索条件或筛选选项</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {words.map((word) => (
              <WordCard key={word._id} word={word} onPlayPronunciation={playPronunciation} />
            ))}
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              上一页
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              下一页
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function WordCard({ 
  word, 
  onPlayPronunciation 
}: { 
  word: Word; 
  onPlayPronunciation: (word: string) => void;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900">{word.word}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPlayPronunciation(word.word)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(word.difficulty)}`}>
              {word.difficulty}
            </span>
            <span className="text-xs text-gray-500">频率: {word.frequency}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{word.pronunciation}</p>

        <div className="space-y-3">
          {word.definitions.map((def, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                  {def.partOfSpeech}
                </span>
              </div>
              <p className="font-semibold mb-1">{def.meaning}</p>
              <div className="text-sm text-gray-600">
                <p className="italic">"{def.example}"</p>
                <p>"{def.exampleTranslation}"</p>
              </div>
            </div>
          ))}
        </div>

        {word.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {word.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'hard': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
