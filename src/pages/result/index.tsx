import { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { getGradeInfo } from '@/utils/scoring';
import { generatePoster } from '@/services/cloud';
import './index.scss';

export default function ResultPage() {
  const router = useRouter();
  const score = Number(router.params.score) || 0;
  const correct = Number(router.params.correct) || 0;
  const wrong = Number(router.params.wrong) || 0;
  const avgTime = router.params.avgTime || '0';

  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const grade = getGradeInfo(score);

  const handleGeneratePoster = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const url = await generatePoster('latest');
      setPosterUrl(url);
    } catch {
      Taro.showToast({ title: '请截图保存结果页', icon: 'none' });
    }
    setIsGenerating(false);
  };

  const handleRetry = () => {
    Taro.redirectTo({ url: '/pages/index/index' });
  };

  const handleSaveToAlbum = () => {
    if (posterUrl) {
      Taro.saveImageToPhotosAlbum({
        filePath: posterUrl,
        success: () => Taro.showToast({ title: '已保存到相册', icon: 'success' }),
        fail: () => Taro.showToast({ title: '保存失败，请重试', icon: 'none' }),
      });
    }
  };

  return (
    <View className="result-page">
      <View className="result-hero">
        <Text className="score-label">你的脑力值</Text>
        <Text className="score-value">{score}</Text>
        <View className="grade-badge">等级 {grade.grade} · {grade.label}</View>
      </View>

      <View className="stats-section">
        <View className="stats-card">
          <View className="stat-item">
            <Text className="stat-item__value" style={{ color: '#22C55E' }}>{correct}</Text>
            <Text className="stat-item__label">答对</Text>
          </View>
          <View className="stat-divider" />
          <View className="stat-item">
            <Text className="stat-item__value" style={{ color: '#EF4444' }}>{wrong}</Text>
            <Text className="stat-item__label">答错</Text>
          </View>
          <View className="stat-divider" />
          <View className="stat-item">
            <Text className="stat-item__value" style={{ color: '#7C3AED' }}>{avgTime}s</Text>
            <Text className="stat-item__label">均速</Text>
          </View>
        </View>
      </View>

      <View className="actions">
        <View className="btn-primary" onClick={handleGeneratePoster}>
          {isGenerating ? '生成中...' : '📤 生成分享海报'}
        </View>
        <View className="btn-secondary" onClick={handleRetry}>
          再做一次
        </View>
        {posterUrl && (
          <View style={{ marginTop: 20, textAlign: 'center' }}>
            <Image src={posterUrl} style={{ width: '100%', borderRadius: 12 }} mode="widthFix" />
            <View className="btn-secondary" onClick={handleSaveToAlbum}>保存到相册</View>
          </View>
        )}
      </View>
    </View>
  );
}
