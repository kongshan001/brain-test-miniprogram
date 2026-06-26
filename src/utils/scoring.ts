import type { AnswerRecord } from '@/types';
import { GRADE_INFO } from './constants';

export function calcQuestionScore(correct: boolean, timeLeft: number, timeLimit: number): number {
  if (!correct) return 0;

  const baseScore = 10;
  const ratio = timeLeft / timeLimit;

  if (ratio > 0.66) return baseScore + 0.5;
  if (ratio > 0.33) return baseScore + 0.25;
  return baseScore;
}

export function calcTotalScore(answers: AnswerRecord[], timeLimit: number): number {
  const total = answers.reduce((sum, a) => {
    return sum + calcQuestionScore(a.correct, timeLimit - a.time_spent, timeLimit);
  }, 0);
  return Math.round(total);
}

export function getGradeInfo(score: number) {
  return GRADE_INFO.find(g => score >= g.minScore && score <= g.maxScore) || GRADE_INFO[GRADE_INFO.length - 1];
}

export function calcStats(answers: AnswerRecord[]) {
  const correct = answers.filter(a => a.correct).length;
  const wrong = answers.length - correct;
  const avgTime = answers.length > 0
    ? (answers.reduce((s, a) => s + a.time_spent, 0) / answers.length).toFixed(1)
    : '0';
  return { correct, wrong, avgTime };
}
