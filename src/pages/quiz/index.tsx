import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import type { Question, AnswerRecord } from '@/types';
import { QUIZ_COUNT, DEFAULT_TIME_LIMIT } from '@/utils/constants';
import { calcTotalScore, calcStats } from '@/utils/scoring';
import { fetchQuestions, saveResult } from '@/services/cloud';
import { getMockQuestions } from '@/utils/mockQuestions';
import './index.scss';

export default function QuizPage() {
  const router = useRouter();
  const difficulty = Number(router.params.difficulty) || 2;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME_LIMIT);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQuestions(difficulty);
        setQuestions(data);
        startTimeRef.current = Date.now();
      } catch {
        setQuestions(getMockQuestions(difficulty));
      }
    };
    load();
  }, [difficulty]);

  useEffect(() => {
    if (questions.length === 0 || isAnswered) return;

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const timeLimit = questions[currentIndex]?.time_limit || DEFAULT_TIME_LIMIT;
      const remaining = Math.max(0, timeLimit - elapsed);

      setTimeLeft(Math.ceil(remaining));

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        handleTimeout();
      }
    }, 200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, questions, isAnswered]);

  const handleTimeout = useCallback(() => {
    setShowTimeout(true);
  }, []);

  const recordAnswer = useCallback((chosen: string, correct: boolean) => {
    const timeSpent = (Date.now() - startTimeRef.current) / 1000;
    const record: AnswerRecord = {
      question_id: questions[currentIndex]._id,
      chosen,
      correct,
      time_spent: Math.min(timeSpent, questions[currentIndex]?.time_limit || DEFAULT_TIME_LIMIT),
    };
    setAnswers(prev => [...prev, record]);
    setIsAnswered(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [currentIndex, questions]);

  const handleSelect = (key: string) => {
    if (isAnswered) return;
    setSelectedKey(key);
    const isCorrect = key === questions[currentIndex].answer;
    recordAnswer(key, isCorrect);
  };

  const goNext = () => {
    if (currentIndex >= questions.length - 1) {
      submitResults();
      return;
    }
    setCurrentIndex(prev => prev + 1);
    setSelectedKey(null);
    setIsAnswered(false);
    setShowTimeout(false);
    setTimeLeft(questions[currentIndex + 1]?.time_limit || DEFAULT_TIME_LIMIT);
    startTimeRef.current = Date.now();
  };

  const submitResults = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const timeLimit = questions[0]?.time_limit || DEFAULT_TIME_LIMIT;
    const score = calcTotalScore(answers, timeLimit);

    try {
      await saveResult(score, difficulty as 1 | 2 | 3, answers);
    } catch {
      // proceed even if save fails
    }

    Taro.redirectTo({
      url: `/pages/result/index?score=${score}&correct=${calcStats(answers).correct}&wrong=${calcStats(answers).wrong}&avgTime=${calcStats(answers).avgTime}`,
    });
  };

  const currentQ = questions[currentIndex];

  if (questions.length === 0) {
    return (
      <View className="quiz-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>加载题目中...</Text>
      </View>
    );
  }

  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / QUIZ_COUNT) * 100;

  return (
    <View className="quiz-page">
      <View className="quiz-topbar">
        <View className="question-badge">{currentIndex + 1}</View>
        <View className="progress-bar">
          <View className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </View>
        <Text className="timer">⏱ {timeLeft}s</Text>
      </View>

      <View className="question-area">
        <View className="question-card">
          <View className="question-card__icon">🔢</View>
          <Text className="question-card__text">{currentQ?.content.text}</Text>
          <Text className="question-card__label">请选择正确的答案</Text>
        </View>

        <View className="options-list">
          {currentQ?.options.map((opt) => {
            let cls = 'option-item';
            if (isAnswered && opt.key === currentQ.answer) cls += ' option-item--correct';
            if (isAnswered && opt.key === selectedKey && opt.key !== currentQ.answer) cls += ' option-item--wrong';
            if (isAnswered && opt.key !== selectedKey) cls += ' option-item--disabled';

            return (
              <View key={opt.key} className={cls} onClick={() => handleSelect(opt.key)}>
                {opt.key}. {opt.text}
              </View>
            );
          })}
        </View>
      </View>

      {isAnswered && !showTimeout && (
        <View style={{ position: 'fixed', bottom: 40, left: 24, right: 24 }}>
          <View
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              padding: 14,
              borderRadius: 'var(--radius-full)',
              textAlign: 'center',
              fontWeight: 600,
            }}
            onClick={goNext}
          >
            {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
          </View>
        </View>
      )}

      {showTimeout && (
        <View className="timeout-overlay">
          <View className="timeout-overlay__box">
            <View className="timeout-overlay__box__text">⏰ 时间到！</View>
            <View
              className="timeout-overlay__box__btn"
              onClick={() => {
                const timeLimit = currentQ?.time_limit || DEFAULT_TIME_LIMIT;
                recordAnswer('', false);
                setShowTimeout(false);
                setTimeout(goNext, 500);
              }}
            >
              {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
