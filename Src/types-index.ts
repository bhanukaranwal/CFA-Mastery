// Question types and interfaces
export interface Question {
  id: number;
  level: 'I' | 'II' | 'III';
  topic: string;
  subtopic: string;
  reading: string;
  question: string;
  options: string[];
  answer_index: number;
  explanation: {
    concise: string;
    detailed: string;
    exam_tip: string;
    misstep_alert: string;
    practical_insight: string;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Core Concept' | 'Calculation' | 'Application' | 'Analysis';
  tags: string[];
  reference: string;
}

// User progress tracking
export interface UserProgress {
  questionsAttempted: number;
  correctAnswers: number;
  studyStreak: number;
  totalStudyTime: number;
  badgesEarned: string[];
  bookmarkedQuestions: number[];
  topicPerformance: Record<string, TopicPerformance>;
  sessionHistory: QuizSession[];
  levelProgress: Record<string, number>;
  userPoints: number;
  lastStudyDate?: string;
}

export interface TopicPerformance {
  attempted: number;
  correct: number;
  accuracy: number;
  averageTime: number;
  lastAttempted: string;
}

// Quiz session data
export interface QuizSession {
  id: string;
  date: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  topics: string[];
  level?: string;
  mode: 'custom' | 'smart' | 'exam' | 'quick' | 'topic';
}

export interface QuizAnswer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  timeSpent: number;
  bookmarked?: boolean;
  flagged?: boolean;
}

// Quiz configuration
export interface QuizConfig {
  numQuestions: number;
  timeLimit: number; // in minutes, 0 for no limit
  level?: 'I' | 'II' | 'III';
  topic?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  type?: 'Core Concept' | 'Calculation' | 'Application' | 'Analysis';
  mode: 'custom' | 'smart' | 'exam' | 'quick' | 'topic';
}

// Current quiz state
export interface CurrentQuiz {
  questions: Question[];
  currentIndex: number;
  answers: QuizAnswer[];
  startTime: number;
  timeLimit: number;
  isActive: boolean;
  isPaused: boolean;
  selectedAnswer: number | null;
  config: QuizConfig;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Badge types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
  points: number;
}

// Analytics data
export interface AnalyticsData {
  topicAccuracy: Record<string, number>;
  difficultyBreakdown: Record<string, number>;
  timeDistribution: Record<string, number>;
  progressTrend: Array<{ date: string; accuracy: number; questions: number }>;
  weaknessAreas: string[];
  strengths: string[];
}

// Community data
export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  streak: number;
  accuracy: number;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: string;
  replies: number;
  lastActivity: string;
  tags: string[];
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentProgress: number;
  reward: number;
  criteria: {
    topic?: string;
    difficulty?: string;
    accuracy?: number;
  };
}

// Formula reference
export interface Formula {
  name: string;
  formula: string;
  description?: string;
  example?: string;
}

// Calculator types
export interface CalculatorInput {
  pv?: number;
  fv?: number;
  rate?: number;
  periods?: number;
  pmt?: number;
}

export interface CalculatorResult {
  result: number;
  formula: string;
  explanation: string;
}
