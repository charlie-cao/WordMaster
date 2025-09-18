// 用户相关类型
export interface User {
  _id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
  stats: UserStats;
}

export interface UserSettings {
  dailyGoal: number;
  difficulty: 'easy' | 'medium' | 'hard';
  reminderTime?: string;
  theme: 'light' | 'dark' | 'system';
  language: 'zh' | 'en';
}

export interface UserStats {
  totalWords: number;
  masteredWords: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number; // 分钟
  wordsLearnedToday: number;
}

// 单词相关类型
export interface Word {
  _id: string;
  word: string;
  pronunciation: string;
  audioUrl?: string;
  definitions: WordDefinition[];
  difficulty: 'easy' | 'medium' | 'hard';
  frequency: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WordDefinition {
  partOfSpeech: string; // 词性：noun, verb, adjective等
  meaning: string; // 中文释义
  example: string; // 英文例句
  exampleTranslation: string; // 例句中文翻译
}

// 学习进度相关类型
export interface UserWordProgress {
  _id: string;
  userId: string;
  wordId: string;
  status: 'learning' | 'reviewing' | 'mastered';
  correctCount: number;
  incorrectCount: number;
  lastReviewedAt: Date;
  nextReviewAt: Date;
  difficulty: number; // 1-5，个人难度评级
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 学习会话相关类型
export interface StudySession {
  _id: string;
  userId: string;
  type: 'daily_practice' | 'review' | 'quiz' | 'challenge';
  wordsStudied: string[];
  correctAnswers: number;
  totalQuestions: number;
  duration: number; // 秒
  startedAt: Date;
  completedAt?: Date;
}

// 单词本相关类型
export interface WordSet {
  _id: string;
  name: string;
  description: string;
  category: 'CET4' | 'CET6' | 'TOEFL' | 'IELTS' | 'GRE' | 'custom';
  words: string[];
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 学习相关类型
export interface StudyCard {
  word: Word;
  progress?: UserWordProgress;
  isNew?: boolean;
}

export interface QuizQuestion {
  id: string;
  word: Word;
  type: 'multiple_choice' | 'fill_blank' | 'translation' | 'listening';
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
}

export interface StudyStats {
  todayStats: {
    wordsLearned: number;
    timeSpent: number;
    accuracy: number;
  };
  weekStats: {
    totalWords: number;
    averageTime: number;
    averageAccuracy: number;
  };
  monthStats: {
    totalWords: number;
    masteredWords: number;
    reviewWords: number;
  };
}

// 成就系统类型
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: {
    type: 'streak' | 'words_learned' | 'accuracy' | 'time_spent';
    target: number;
  };
  reward?: {
    type: 'badge' | 'title' | 'theme';
    value: string;
  };
}

// 表单类型
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface StudySettingsForm {
  dailyGoal: number;
  difficulty: 'easy' | 'medium' | 'hard';
  reminderTime?: string;
  selectedWordSets: string[];
}
