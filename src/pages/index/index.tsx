import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { DIFFICULTY_CONFIGS } from '@/utils/constants';
import './index.scss';

export default function HomePage() {
  const [difficulty, setDifficulty] = useState(2);

  const handleStart = () => {
    Taro.navigateTo({
      url: `/pages/quiz/index?difficulty=${difficulty}`,
    });
  };

  return (
    <View className="home-page">
      <View className="hero">
        <Text className="hero__icon">🧠</Text>
        <Text className="hero__title">脑力测试</Text>
        <Text className="hero__desc">3分钟 · 10道题 · 测测你的脑力值</Text>
      </View>

      <View className="difficulty-section">
        <View className="difficulty-row">
          {DIFFICULTY_CONFIGS.map((d) => (
            <View
              key={d.level}
              className={`difficulty-card ${difficulty === d.level ? 'difficulty-card--selected' : ''}`}
              onClick={() => setDifficulty(d.level)}
            >
              <Text className="difficulty-card__icon">{d.icon}</Text>
              <Text className="difficulty-card__label">{d.label}</Text>
              <Text className="difficulty-card__subtitle">{d.subtitle}</Text>
            </View>
          ))}
        </View>

        <View className="cta-button" onClick={handleStart}>
          开始测试
        </View>
      </View>

      <View className="footer-hint">10 道题 · 约 3 分钟</View>
    </View>
  );
}
