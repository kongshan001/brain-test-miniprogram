export type QuestionType = 'logic' | 'number' | 'spatial' | 'memory';

export interface Question {
  _id: string;
  type: QuestionType;
  difficulty: 1 | 2 | 3;
  content: {
    text: string;
    image?: string;
  };
  options: { key: string; text: string; image?: string }[];
  answer: string;
  time_limit: number;
}

export interface AnswerRecord {
  question_id: string;
  chosen: string;
  correct: boolean;
  time_spent: number;
}

export interface TestResult {
  _id?: string;
  openid?: string;
  score: number;
  difficulty: 1 | 2 | 3;
  answers: AnswerRecord[];
  created_at?: Date;
}

export interface DifficultyConfig {
  level: 1 | 2 | 3;
  label: string;
  subtitle: string;
  icon: string;
}

export interface GradeInfo {
  grade: string;
  label: string;
  minScore: number;
  maxScore: number;
  color: string;
}
