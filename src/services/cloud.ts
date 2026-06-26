import Taro from '@tarojs/taro';
import type { Question, TestResult, AnswerRecord } from '@/types';
import { QUIZ_COUNT } from '@/utils/constants';

export async function fetchQuestions(difficulty: number): Promise<Question[]> {
  const res = await Taro.cloud.callFunction({
    name: 'getQuestions',
    data: { difficulty, count: QUIZ_COUNT },
  });
  return (res.result as any).questions as Question[];
}

export async function saveResult(
  score: number,
  difficulty: number,
  answers: AnswerRecord[],
): Promise<string> {
  const res = await Taro.cloud.callFunction({
    name: 'saveResult',
    data: { score, difficulty, answers },
  });
  return (res.result as any).resultId as string;
}

export async function generatePoster(resultId: string): Promise<string> {
  const res = await Taro.cloud.callFunction({
    name: 'generatePoster',
    data: { resultId },
  });
  return (res.result as any).posterUrl as string;
}
