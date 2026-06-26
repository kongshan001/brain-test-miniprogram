# 脑力测试微信小程序

Taro + React + TypeScript + 微信云开发

## 命令
- `npm run dev:weapp` — 开发模式
- `npm run build:weapp` — 构建
- `npx tsc --noEmit` — 类型检查

## 页面
- `src/pages/index/` — 首页（难度选择）
- `src/pages/quiz/` — 答题页（计时+进度+选项）
- `src/pages/result/` — 结果页（分数+分享）

## 工具
- `src/utils/scoring.ts` — 评分算法
- `src/utils/constants.ts` — 常量
- `src/services/cloud.ts` — CloudBase 调用
- `cloud/functions/` — 云函数

## 设计
- 配色: Primary #2563EB, Secondary #7C3AED, Accent #F59E0B
- 间距: 8dp 系统
- 目标: 微信小程序 MVP
