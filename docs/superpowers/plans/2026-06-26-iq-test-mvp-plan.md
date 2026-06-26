# 脑力测试微信小程序 — MVP 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个微信小程序 MVP，用户选择难度后答 10 道趣味烧脑题，获得分数等级并生成分享海报。

**Architecture:** Taro + React + TypeScript 前端，微信云开发（CloudBase）后端。3 个页面（首页/答题/结果）+ 3 个云函数（选题/存成绩/生成海报）。8dp 设计系统，蓝紫金配色。

**Tech Stack:** Taro 3, React 18, TypeScript, 微信云开发 (CloudBase), SCSS

---

## 文件结构

```
iq_test/
├── src/
│   ├── app.config.ts          # Taro 页面路由配置
│   ├── app.ts                 # 应用入口，CloudBase 初始化
│   ├── app.scss               # 全局样式、CSS 变量、设计 tokens
│   ├── types/
│   │   └── index.ts           # 全部 TypeScript 类型定义
│   ├── utils/
│   │   ├── scoring.ts         # 评分算法（正确分 + 速度奖励）
│   │   └── constants.ts       # 等级文案、颜色常量
│   ├── services/
│   │   └── cloud.ts           # CloudBase 调用封装
│   ├── pages/
│   │   ├── index/
│   │   │   ├── index.tsx      # 首页：难度选择 + 开始测试
│   │   │   ├── index.scss
│   │   │   └── index.config.ts
│   │   ├── quiz/
│   │   │   ├── index.tsx      # 答题页：进度 + 计时 + 选项交互
│   │   │   ├── index.scss
│   │   │   └── index.config.ts
│   │   └── result/
│   │       ├── index.tsx      # 结果页：分数 + 统计 + 分享入口
│   │       ├── index.scss
│   │       └── index.config.ts
├── cloud/
│   └── functions/
│       ├── getQuestions/
│       │   ├── index.js        # 随机抽题云函数
│       │   └── config.json
│       ├── saveResult/
│       │   ├── index.js        # 保存成绩云函数
│       │   └── config.json
│       └── generatePoster/
│           ├── index.js        # Canvas 生成海报云函数
│           └── config.json
├── project.config.json
├── package.json
└── tsconfig.json
```

---

### Task 1: 项目初始化与基础配置

**Files:**
- Create: `project.config.json`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `src/app.config.ts`
- Create: `src/app.ts`
- Create: `src/app.scss`
- Create: `src/types/index.ts`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "brain-test-miniprogram",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev:weapp": "taro build --type weapp --watch",
    "build:weapp": "taro build --type weapp"
  },
  "dependencies": {
    "@tarojs/components": "^3.6.0",
    "@tarojs/taro": "^3.6.0",
    "@tarojs/runtime": "^3.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@tarojs/cli": "^3.6.0",
    "@tarojs/mini-runner": "^3.6.0",
    "@tarojs/plugin-framework-react": "^3.6.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "sass": "^1.63.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "commonjs",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": false,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 project.config.json**

```json
{
  "miniprogramRoot": "dist/",
  "cloudfunctionRoot": "cloud/functions/",
  "setting": {
    "urlCheck": true,
    "es6": true,
    "postcss": true,
    "minified": true
  },
  "appid": "{{WEAPP_APPID}}",
  "projectname": "brain-test"
}
```

- [ ] **Step 4: 创建类型定义 src/types/index.ts**

```typescript
// 题目类型（MVP 仅 logic，预留扩展）
export type QuestionType = 'logic' | 'number' | 'spatial' | 'memory';

// 题目
export interface Question {
  _id: string;
  type: QuestionType;
  difficulty: 1 | 2 | 3; // 1=简单 2=中等 3=困难
  content: {
    text: string;
    image?: string; // 云存储图片 URL，可选
  };
  options: { key: string; text: string; image?: string }[];
  answer: string;
  time_limit: number; // 秒，默认 30
}

// 单题作答记录
export interface AnswerRecord {
  question_id: string;
  chosen: string;     // 用户选的 key
  correct: boolean;
  time_spent: number; // 秒
}

// 成绩
export interface TestResult {
  _id?: string;
  openid?: string;
  score: number;
  difficulty: 1 | 2 | 3;
  answers: AnswerRecord[];
  created_at?: Date;
}

// 难度配置
export interface DifficultyConfig {
  level: 1 | 2 | 3;
  label: string;
  subtitle: string;
  icon: string;
}

// 等级
export interface GradeInfo {
  grade: string;
  label: string;
  minScore: number;
  maxScore: number;
  color: string;
}
```

- [ ] **Step 5: 创建 app.config.ts**

```typescript
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/quiz/index',
    'pages/result/index',
  ],
  window: {
    navigationBarTitleText: '脑力测试',
    navigationBarBackgroundColor: '#2563EB',
    navigationBarTextStyle: 'white',
    backgroundColor: '#EFF6FF',
  },
});
```

- [ ] **Step 6: 创建 app.ts（CloudBase 初始化）**

```typescript
import { Component, PropsWithChildren } from 'react';
import './app.scss';

// CloudBase 通过微信小程序原生 API 初始化，在 app.ts 中声明
// 实际初始化由 Taro.cloud.init() 在首次调用时自动完成

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      const cloud = require('@tarojs/taro').cloud;
      cloud.init({
        env: '{{CLOUDBASE_ENV_ID}}', // CloudBase 环境 ID
        traceUser: true,
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default App;
```

- [ ] **Step 7: 创建全局样式 src/app.scss**

```scss
// 设计系统 Token
:root {
  --color-primary: #2563EB;
  --color-primary-light: #3B82F6;
  --color-secondary: #7C3AED;
  --color-accent: #F59E0B;
  --color-accent-dark: #F97316;
  --color-background: #EFF6FF;
  --color-foreground: #0F172A;
  --color-muted: #F1F5FD;
  --color-border: #E4ECFC;
  --color-success: #22C55E;
  --color-error: #EF4444;
  --color-text-secondary: #64748B;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 30px;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  --font-heading: 'Fredoka', 'PingFang SC', sans-serif;
  --font-body: 'Nunito', 'PingFang SC', sans-serif;
}

page {
  background-color: var(--color-background);
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--color-foreground);
  line-height: 1.5;
}

// 触摸优化
button, view[onClick] {
  touch-action: manipulation;
}

// 追碰目标底线
button, .tappable {
  min-height: 44px;
  min-width: 44px;
}
```

- [ ] **Step 8: 安装依赖并验证构建**

```bash
cd /Users/ks_128/Documents/iq_test && npm install
```

Run: `npm run build:weapp`
Expected: 构建成功，`dist/` 目录生成。

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: initialize Taro project with types, config, and design tokens"
```

---

### Task 2: 工具函数 — 评分算法与常量

**Files:**
- Create: `src/utils/constants.ts`
- Create: `src/utils/scoring.ts`

- [ ] **Step 1: 创建常量文件 src/utils/constants.ts**

```typescript
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
```

- [ ] **Step 2: 创建评分算法文件 src/utils/scoring.ts**

```typescript
import type { AnswerRecord } from '@/types';
import { GRADE_INFO } from './constants';

// 单题得分
export function calcQuestionScore(correct: boolean, timeLeft: number, timeLimit: number): number {
  if (!correct) return 0;

  const baseScore = 10;
  const ratio = timeLeft / timeLimit;

  if (ratio > 0.66) return baseScore + 0.5;   // 剩余 > 20s
  if (ratio > 0.33) return baseScore + 0.25;  // 剩余 > 10s
  return baseScore;
}

// 计算总分
export function calcTotalScore(answers: AnswerRecord[], timeLimit: number): number {
  const total = answers.reduce((sum, a) => {
    return sum + calcQuestionScore(a.correct, timeLimit - a.time_spent, timeLimit);
  }, 0);
  return Math.round(total);
}

// 获取等级信息
export function getGradeInfo(score: number) {
  return GRADE_INFO.find(g => score >= g.minScore && score <= g.maxScore) || GRADE_INFO[GRADE_INFO.length - 1];
}

// 计算统计
export function calcStats(answers: AnswerRecord[]) {
  const correct = answers.filter(a => a.correct).length;
  const wrong = answers.length - correct;
  const avgTime = answers.length > 0
    ? (answers.reduce((s, a) => s + a.time_spent, 0) / answers.length).toFixed(1)
    : '0';
  return { correct, wrong, avgTime };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/
git commit -m "feat: add scoring algorithm and constants"
```

---

### Task 3: 云开发服务层封装

**Files:**
- Create: `src/services/cloud.ts`

- [ ] **Step 1: 创建 CloudBase 调用封装 src/services/cloud.ts**

```typescript
import Taro from '@tarojs/taro';
import type { Question, TestResult, AnswerRecord } from '@/types';
import { QUIZ_COUNT } from '@/utils/constants';

// 获取随机题目
export async function fetchQuestions(difficulty: number): Promise<Question[]> {
  const res = await Taro.cloud.callFunction({
    name: 'getQuestions',
    data: { difficulty, count: QUIZ_COUNT },
  });
  return (res.result as any).questions as Question[];
}

// 保存成绩
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

// 生成分享海报
export async function generatePoster(resultId: string): Promise<string> {
  const res = await Taro.cloud.callFunction({
    name: 'generatePoster',
    data: { resultId },
  });
  return (res.result as any).posterUrl as string;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/services/
git commit -m "feat: add CloudBase service layer"
```

---

### Task 4: 云函数实现

**Files:**
- Create: `cloud/functions/getQuestions/index.js`
- Create: `cloud/functions/getQuestions/config.json`
- Create: `cloud/functions/saveResult/index.js`
- Create: `cloud/functions/saveResult/config.json`
- Create: `cloud/functions/generatePoster/index.js`
- Create: `cloud/functions/generatePoster/config.json`

- [ ] **Step 1: 创建 getQuestions 云函数**

`cloud/functions/getQuestions/config.json`:
```json
{
  "permissions": {
    "openapi": []
  }
}
```

`cloud/functions/getQuestions/index.js`:
```javascript
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { difficulty, count = 10 } = event;

  // 从题库中按难度随机抽取
  const { total } = await db.collection('questions')
    .where({ difficulty })
    .count();

  if (total === 0) {
    return { questions: [] };
  }

  // 随机跳过 offset 实现随机抽题
  const skip = Math.max(0, Math.floor(Math.random() * (total - count)));
  const { data } = await db.collection('questions')
    .where({ difficulty })
    .skip(skip)
    .limit(count)
    .get();

  // 打乱顺序
  const shuffled = data.sort(() => Math.random() - 0.5);

  return { questions: shuffled };
};
```

- [ ] **Step 2: 创建 saveResult 云函数**

`cloud/functions/saveResult/config.json`:
```json
{
  "permissions": {
    "openapi": []
  }
}
```

`cloud/functions/saveResult/index.js`:
```javascript
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const { score, difficulty, answers } = event;

  const { _id } = await db.collection('results').add({
    data: {
      openid: wxContext.OPENID,
      score,
      difficulty,
      answers,
      created_at: db.serverDate(),
    },
  });

  return { resultId: _id };
};
```

- [ ] **Step 3: 创建 generatePoster 云函数**

`cloud/functions/generatePoster/config.json`:
```json
{
  "permissions": {
    "openapi": []
  }
}
```

`cloud/functions/generatePoster/index.js`:
```javascript
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { resultId } = event;

  // 查询成绩
  const { data: result } = await db.collection('results').doc(resultId).get();
  if (!result) throw new Error('Result not found');

  // 用离屏 Canvas 绘制海报（微信云开发支持 node-canvas）
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(750, 1334);
  const ctx = canvas.getContext('2d');

  // 背景
  const gradient = ctx.createLinearGradient(0, 0, 0, 600);
  gradient.addColorStop(0, '#2563EB');
  gradient.addColorStop(1, '#7C3AED');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 750, 600);

  // 标题
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('脑力测试报告', 375, 100);

  // 分数
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 160px sans-serif';
  ctx.fillText(String(result.score), 375, 360);

  // 等级
  ctx.font = '32px sans-serif';
  ctx.fillText('等级 A · 才思敏捷', 375, 440);

  // 统计
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '24px sans-serif';
  const correct = result.answers.filter(a => a.correct).length;
  ctx.fillText(`答对 ${correct} 题`, 375, 510);

  // 白色底部
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 620, 750, 714);

  // 将海报上传到云存储
  const buffer = canvas.toBuffer('image/png');
  const cloudPath = `posters/${resultId}.png`;
  await cloud.uploadFile({
    cloudPath,
    fileContent: buffer,
  });

  // 获取临时链接
  const { fileList } = await cloud.getTempFileURL({
    fileList: [cloudPath],
  });

  const posterUrl = fileList[0].tempFileURL;

  // 保存到数据库
  await db.collection('share_posters').add({
    data: {
      result_id: resultId,
      cloud_path: cloudPath,
      created_at: db.serverDate(),
    },
  });

  return { posterUrl };
};
```

- [ ] **Step 4: Commit**

```bash
git add cloud/
git commit -m "feat: add CloudBase cloud functions"
```

---

### Task 5: 首页 — 难度选择与开始测试

**Files:**
- Create: `src/pages/index/index.config.ts`
- Create: `src/pages/index/index.tsx`
- Create: `src/pages/index/index.scss`

- [ ] **Step 1: 创建页面配置 src/pages/index/index.config.ts**

```typescript
export default definePageConfig({
  navigationBarTitleText: '脑力测试',
});
```

- [ ] **Step 2: 创建首页样式 src/pages/index/index.scss**

```scss
.home-page {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  padding: 48px 24px 56px;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 140px;
    height: 140px;
    background: rgba(255,255,255,0.08);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 100px;
    height: 100px;
    background: rgba(255,255,255,0.06);
    border-radius: 50%;
  }

  &__icon {
    font-size: 48px;
    margin-bottom: 8px;
    position: relative;
    z-index: 1;
  }

  &__title {
    font-family: var(--font-heading);
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 4px;
    position: relative;
    z-index: 1;
    letter-spacing: -0.5px;
  }

  &__desc {
    font-size: 14px;
    opacity: 0.85;
    position: relative;
    z-index: 1;
  }
}

.difficulty-section {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  top: -20px;
}

.difficulty-row {
  display: flex;
  gap: 10px;
}

.difficulty-card {
  flex: 1;
  background: #fff;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px 12px;
  text-align: center;
  transition: all 0.2s ease;

  &--selected {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: #fff;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);

    .difficulty-card__label {
      color: #fff;
    }

    .difficulty-card__subtitle {
      color: rgba(255,255,255,0.8);
    }
  }

  &__icon {
    font-size: 22px;
    margin-bottom: 4px;
  }

  &__label {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-primary);
  }

  &__subtitle {
    font-size: 11px;
    color: var(--color-text-secondary);
    margin-top: 2px;
  }
}

.cta-button {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  color: #fff;
  padding: 16px;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.35);
  margin-top: 4px;
}

.footer-hint {
  text-align: center;
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 24px;
}
```

- [ ] **Step 3: 创建首页组件 src/pages/index/index.tsx**

```typescript
import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { DIFFICULTY_CONFIGS } from '@/utils/constants';
import './index.scss';

export default function HomePage() {
  const [difficulty, setDifficulty] = useState(2); // 默认中等

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
```

- [ ] **Step 4: 验证页面可访问**

Run: `npm run build:weapp`
Expected: 编译成功，首页在微信开发者工具中可见。

- [ ] **Step 5: Commit**

```bash
git add src/pages/index/
git commit -m "feat: add home page with difficulty selection"
```

---

### Task 6: 答题页 — 计时、进度与选项交互

**Files:**
- Create: `src/pages/quiz/index.config.ts`
- Create: `src/pages/quiz/index.tsx`
- Create: `src/pages/quiz/index.scss`

- [ ] **Step 1: 创建页面配置 src/pages/quiz/index.config.ts**

```typescript
export default definePageConfig({
  navigationBarTitleText: '答题中',
  disableScroll: true,
});
```

- [ ] **Step 2: 创建答题页样式 src/pages/quiz/index.scss**

```scss
.quiz-page {
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

// 顶栏
.quiz-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
}

.question-badge {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
}

.progress-bar {
  flex: 1;
  background: var(--color-border);
  border-radius: 6px;
  height: 8px;

  &__fill {
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    height: 100%;
    border-radius: 6px;
    transition: width 0.3s ease;
  }
}

.timer {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent);
  flex-shrink: 0;
}

// 题干区
.question-area {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.question-card {
  background: var(--color-muted);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  text-align: center;
  margin-bottom: 24px;

  &__icon {
    font-size: 36px;
    margin-bottom: 12px;
  }

  &__text {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-foreground);
    line-height: 1.6;
  }

  &__label {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin-top: 8px;
  }
}

// 选项
.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-foreground);
  background: #fff;
  transition: all 0.2s ease;

  &--correct {
    background: #DCFCE7;
    border-color: var(--color-success);
    color: #166534;
  }

  &--wrong {
    background: #FEE2E2;
    border-color: var(--color-error);
    color: #991B1B;
  }

  &--disabled {
    opacity: 0.6;
  }
}

// 超时提示
.timeout-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  &__box {
    background: #fff;
    border-radius: var(--radius-lg);
    padding: 32px;
    text-align: center;
    width: 280px;

    &__text {
      font-size: 16px;
      margin-bottom: 20px;
    }

    &__btn {
      background: var(--color-primary);
      color: #fff;
      padding: 12px 0;
      border-radius: var(--radius-full);
      font-weight: 600;
    }
  }
}
```

- [ ] **Step 3: 创建答题页组件 src/pages/quiz/index.tsx**

```typescript
import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import type { Question, AnswerRecord } from '@/types';
import { QUIZ_COUNT, DEFAULT_TIME_LIMIT } from '@/utils/constants';
import { calcTotalScore, calcStats } from '@/utils/scoring';
import { fetchQuestions, saveResult } from '@/services/cloud';
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

  // 加载题目
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQuestions(difficulty);
        setQuestions(data);
        startTimeRef.current = Date.now();
      } catch {
        // 网络错误时使用 Mock 数据
        setQuestions(getMockQuestions(difficulty));
      }
    };
    load();
  }, [difficulty]);

  // 倒计时
  useEffect(() => {
    if (questions.length === 0 || isAnswered) return;

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const timeLimit = questions[currentIndex]?.time_limit || DEFAULT_TIME_LIMIT;
      const remaining = Math.max(0, timeLimit - elapsed);

      setTimeLeft(Math.ceil(remaining));

      if (remaining <= 0) {
        clearInterval(timerRef.current!);
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
      // 保存失败也跳转结果页
    }

    Taro.redirectTo({
      url: `/pages/result/index?score=${score}&correct=${calcStats(answers).correct}&wrong=${calcStats(answers).wrong}&avgTime=${calcStats(answers).avgTime}`,
    });
  };

  const currentQ = questions[currentIndex];

  if (questions.length === 0) {
    return (
      <View className="quiz-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View className="loading">加载题目中...</View>
      </View>
    );
  }

  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / QUIZ_COUNT) * 100;

  return (
    <View className="quiz-page">
      {/* 顶栏 */}
      <View className="quiz-topbar">
        <View className="question-badge">{currentIndex + 1}</View>
        <View className="progress-bar">
          <View className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </View>
        <Text className="timer">⏱ {timeLeft}s</Text>
      </View>

      {/* 题干 */}
      <View className="question-area">
        <View className="question-card">
          <View className="question-card__icon">🔢</View>
          <Text className="question-card__text">{currentQ?.content.text}</Text>
          <Text className="question-card__label">请选择正确的答案</Text>
        </View>

        {/* 选项 */}
        <View className="options-list">
          {currentQ?.options.map((opt) => {
            let cls = 'option-item';
            if (isAnswered && opt.key === currentQ.answer) cls += ' option-item--correct';
            if (isAnswered && opt.key === selectedKey && !currentQ.answer.includes(opt.key)) cls += ' option-item--wrong';
            if (isAnswered && opt.key !== selectedKey) cls += ' option-item--disabled';

            return (
              <View
                key={opt.key}
                className={cls}
                onClick={() => handleSelect(opt.key)}
              >
                {opt.key}. {opt.text}
              </View>
            );
          })}
        </View>
      </View>

      {/* 答对/答错后自动跳转 */}
      {isAnswered && !showTimeout && (
        <View
          style={{
            position: 'fixed',
            bottom: 40,
            left: 24,
            right: 24,
          }}
        >
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

      {/* 超时弹窗 */}
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

// 离线 Mock 题库
function getMockQuestions(difficulty: number): Question[] {
  const mock: Question = {
    _id: `mock_${difficulty}`,
    type: 'logic',
    difficulty: difficulty as 1 | 2 | 3,
    content: { text: '2, 4, 8, 16, ?' },
    options: [
      { key: 'A', text: '24' },
      { key: 'B', text: '30' },
      { key: 'C', text: '32' },
      { key: 'D', text: '36' },
    ],
    answer: 'C',
    time_limit: DEFAULT_TIME_LIMIT,
  };
  return Array(10).fill(null).map((_, i) => ({ ...mock, _id: `mock_${difficulty}_${i}` }));
}
```

- [ ] **Step 4: 验证答题流程**

Run: `npm run build:weapp`
Expected: 编译成功。

- [ ] **Step 5: Commit**

```bash
git add src/pages/quiz/
git commit -m "feat: add quiz page with timer, progress, and option interaction"
```

---

### Task 7: 结果页 — 分数展示与分享入口

**Files:**
- Create: `src/pages/result/index.config.ts`
- Create: `src/pages/result/index.tsx`
- Create: `src/pages/result/index.scss`

- [ ] **Step 1: 创建页面配置 src/pages/result/index.config.ts**

```typescript
export default definePageConfig({
  navigationBarTitleText: '测试结果',
});
```

- [ ] **Step 2: 创建结果页样式 src/pages/result/index.scss**

```scss
.result-page {
  min-height: 100vh;
}

.result-hero {
  background: linear-gradient(180deg, var(--color-secondary), var(--color-primary) 60%, var(--color-background) 60%);
  padding: 40px 24px 32px;
  text-align: center;
  color: #fff;
}

.score-label {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 4px;
}

.score-value {
  font-size: 88px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -2px;
}

.grade-badge {
  display: inline-block;
  background: rgba(255,255,255,0.18);
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
}

// 统计卡片
.stats-section {
  padding: 0 20px;
  position: relative;
  top: -16px;
}

.stats-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.stat-item {
  text-align: center;

  &__value {
    font-size: 30px;
    font-weight: 700;
  }

  &__label {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin-top: 2px;
  }
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--color-border);
}

// 操作按钮
.actions {
  padding: 24px 20px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  color: #fff;
  padding: 16px;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
}

.btn-secondary {
  text-align: center;
  margin-top: 14px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-primary);
  padding: 8px;
}
```

- [ ] **Step 3: 创建结果页组件 src/pages/result/index.tsx**

```typescript
import { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { getGradeInfo } from '@/utils/scoring';
import { GRADE_INFO } from '@/utils/constants';
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
      // 云函数生成海报
      const url = await generatePoster('latest');
      setPosterUrl(url);
    } catch {
      // 云函数不可用时提示用户截图
      Taro.showToast({ title: '请截图保存结果页', icon: 'none' });
    }
    setIsGenerating(false);
  };

  const handleRetry = () => {
    Taro.redirectTo({ url: '/pages/index/index' });
  };

  const handleShare = () => {
    if (posterUrl) {
      // 保存图片到相册
      Taro.saveImageToPhotosAlbum({
        filePath: posterUrl,
        success: () => Taro.showToast({ title: '已保存到相册', icon: 'success' }),
        fail: () => Taro.showToast({ title: '保存失败，请重试', icon: 'none' }),
      });
    }
  };

  return (
    <View className="result-page">
      {/* Hero 分数区 */}
      <View className="result-hero">
        <Text className="score-label">你的脑力值</Text>
        <Text className="score-value">{score}</Text>
        <View className="grade-badge">等级 {grade.grade} · {grade.label}</View>
      </View>

      {/* 统计 */}
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

      {/* 操作按钮 */}
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
            <View className="btn-secondary" onClick={handleShare}>保存到相册</View>
          </View>
        )}
      </View>
    </View>
  );
}
```

- [ ] **Step 4: 验证结果页**

Run: `npm run build:weapp`
Expected: 编译成功。

- [ ] **Step 5: Commit**

```bash
git add src/pages/result/
git commit -m "feat: add result page with score display and share entry"
```

---

### Task 8: 集成验证与收尾

**Files:** 无新建，验证所有页面串联

- [ ] **Step 1: 构建验证**

```bash
cd /Users/ks_128/Documents/iq_test && npm run build:weapp
```
Expected: 无错误，`dist/` 产出完整。

- [ ] **Step 2: 检查页面路由完整**

确认 `src/app.config.ts` 包含 3 个页面路径：
- `pages/index/index`
- `pages/quiz/index`
- `pages/result/index`

- [ ] **Step 3: 检查云函数配置**

确认 `project.config.json` 中 `cloudfunctionRoot` 指向 `cloud/functions/`。

- [ ] **Step 4: 类型检查**

```bash
cd /Users/ks_128/Documents/iq_test && npx tsc --noEmit
```
Expected: 无类型错误。

- [ ] **Step 5: 创建 CLAUDE.md 项目级指引**

`CLAUDE.md`:
```markdown
# 脑力测试微信小程序

Taro + React + TypeScript + 微信云开发

## 命令
- `npm run dev:weapp` — 开发模式
- `npm run build:weapp` — 构建
- `npx tsc --noEmit` — 类型检查

## 文件
- `src/pages/` — 页面组件
- `src/utils/` — 工具函数
- `src/services/` — CloudBase 调用
- `cloud/functions/` — 云函数

## 设计
- 配色: Primary #2563EB, Secondary #7C3AED, Accent #F59E0B
- 间距: 8dp 系统
- 目标: 微信小程序 MVP，暂不涉及多端编译
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: final integration, type check, and project docs"
```

---

## 完成检查清单

- [ ] 首页：3 个难度卡片 + 开始按钮，点击跳转答题页带 `?difficulty=`
- [ ] 答题页：进度条 + 倒计时 + 选项点击反馈（绿/红）+ 自动跳下一题
- [ ] 答题页：超时提醒弹窗
- [ ] 答题页：离线 Mock 数据可用（无云函数时）
- [ ] 结果页：大分数 + 等级标签 + 三列统计
- [ ] 结果页：生成海报按钮 + 再做一次
- [ ] 评分算法：正确分 + 速度奖励计算正确
- [ ] 云函数：getQuestions / saveResult / generatePoster
- [ ] 类型检查通过
- [ ] 构建通过
