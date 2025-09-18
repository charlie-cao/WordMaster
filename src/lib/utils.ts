import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 时间格式化工具
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN');
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('zh-CN');
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}秒`;
  } else if (remainingSeconds === 0) {
    return `${minutes}分钟`;
  } else {
    return `${minutes}分${remainingSeconds}秒`;
  }
}

// 学习统计工具
export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function calculateNextReview(
  lastReview: Date,
  correctCount: number,
  incorrectCount: number
): Date {
  const now = new Date();
  const daysSinceLastReview = Math.floor(
    (now.getTime() - lastReview.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 艾宾浩斯遗忘曲线间隔（天）
  const intervals = [1, 3, 7, 15, 30, 60, 120];
  
  // 根据正确和错误次数计算当前间隔等级
  const accuracy = calculateAccuracy(correctCount, correctCount + incorrectCount);
  let intervalIndex = Math.min(correctCount, intervals.length - 1);
  
  // 如果准确率低于70%，减少间隔
  if (accuracy < 70) {
    intervalIndex = Math.max(0, intervalIndex - 1);
  }
  
  const nextInterval = intervals[intervalIndex];
  const nextReview = new Date(now.getTime() + nextInterval * 24 * 60 * 60 * 1000);
  
  return nextReview;
}

// 单词难度评估
export function assessWordDifficulty(
  word: string,
  frequency: number,
  syllableCount?: number
): 'easy' | 'medium' | 'hard' {
  // 基于词频和长度评估难度
  const length = word.length;
  
  if (frequency > 1000 && length <= 5) return 'easy';
  if (frequency > 100 && length <= 8) return 'medium';
  return 'hard';
}

// 数据验证工具
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // 至少8位，包含字母和数字
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

// 随机工具
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

// 本地存储工具
export function saveToLocalStorage(key: string, data: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

// 错误处理工具
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return '未知错误';
}

// 数字格式化
export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  return (num / 1000000).toFixed(1) + 'M';
}

// 进度计算
export function calculateProgress(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
}

// 学习级别计算
export function calculateLevel(totalWords: number): {
  level: number;
  progress: number;
  nextLevelWords: number;
} {
  // 每级需要的单词数：100, 200, 400, 800, 1600...
  let level = 1;
  let wordsForCurrentLevel = 100;
  let totalWordsForLevel = 0;
  
  while (totalWords >= totalWordsForLevel + wordsForCurrentLevel) {
    totalWordsForLevel += wordsForCurrentLevel;
    level++;
    wordsForCurrentLevel *= 2;
  }
  
  const currentLevelWords = totalWords - totalWordsForLevel;
  const progress = Math.round((currentLevelWords / wordsForCurrentLevel) * 100);
  const nextLevelWords = wordsForCurrentLevel - currentLevelWords;
  
  return { level, progress, nextLevelWords };
}
