import { ObjectId } from 'mongodb';
import { UserWordProgress } from '@/types';
import { calculateNextReview } from '@/lib/utils';

export interface UserWordProgressDocument extends Omit<UserWordProgress, '_id' | 'userId' | 'wordId'> {
  _id: ObjectId;
  userId: ObjectId;
  wordId: ObjectId;
}

export function createUserWordProgressDocument(data: {
  userId: string;
  wordId: string;
  status?: 'learning' | 'reviewing' | 'mastered';
  difficulty?: number;
  notes?: string;
}): Omit<UserWordProgressDocument, '_id'> {
  const now = new Date();
  const nextReview = calculateNextReview(now, 0, 0);
  
  return {
    userId: new ObjectId(data.userId),
    wordId: new ObjectId(data.wordId),
    status: data.status || 'learning',
    correctCount: 0,
    incorrectCount: 0,
    lastReviewedAt: now,
    nextReviewAt: nextReview,
    difficulty: data.difficulty || 3,
    notes: data.notes,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateUserWordProgress(
  progress: UserWordProgressDocument,
  isCorrect: boolean
): Partial<UserWordProgressDocument> {
  const now = new Date();
  const updates: Partial<UserWordProgressDocument> = {
    lastReviewedAt: now,
    updatedAt: now,
  };

  if (isCorrect) {
    updates.correctCount = progress.correctCount + 1;
    // 如果连续答对多次，可以标记为已掌握
    if (updates.correctCount >= 5 && progress.incorrectCount <= 1) {
      updates.status = 'mastered';
    } else {
      updates.status = 'reviewing';
    }
  } else {
    updates.incorrectCount = progress.incorrectCount + 1;
    updates.status = 'learning';
    // 答错了，增加个人难度
    updates.difficulty = Math.min(5, progress.difficulty + 0.5);
  }

  // 计算下次复习时间
  updates.nextReviewAt = calculateNextReview(
    now,
    updates.correctCount || progress.correctCount,
    updates.incorrectCount || progress.incorrectCount
  );

  return updates;
}

export function sanitizeUserWordProgress(progress: UserWordProgressDocument): UserWordProgress {
  return {
    ...progress,
    _id: progress._id.toString(),
    userId: progress.userId.toString(),
    wordId: progress.wordId.toString(),
  };
}
