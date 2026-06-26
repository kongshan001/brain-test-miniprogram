import type { DifficultyConfig, GradeInfo } from '@/types';

export const DIFFICULTY_CONFIGS: DifficultyConfig[] = [
  { level: 1, label: '简单', subtitle: '热身模式', icon: '🌟' },
  { level: 2, label: '中等', subtitle: '推荐', icon: '⚡' },
  { level: 3, label: '困难', subtitle: '挑战模式', icon: '🔥' },
];

export const GRADE_INFO: GradeInfo[] = [
  { grade: 'S', label: '脑力天花板', minScore: 90, maxScore: 100, color: '#F59E0B' },
  { grade: 'A', label: '才思敏捷', minScore: 70, maxScore: 89, color: '#22C55E' },
  { grade: 'B', label: '潜力无限', minScore: 50, maxScore: 69, color: '#2563EB' },
  { grade: 'C', label: '继续修炼', minScore: 30, maxScore: 49, color: '#7C3AED' },
  { grade: 'D', label: '今日状态不佳', minScore: 0, maxScore: 29, color: '#EF4444' },
];

export const QUIZ_COUNT = 10;
export const DEFAULT_TIME_LIMIT = 30;
