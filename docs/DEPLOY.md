# 脑力测试 — 部署指南

## 前置条件

- 微信开发者工具（[下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)）
- 微信小程序 AppID（[注册](https://mp.weixin.qq.com/)）
- Node.js >= 16

## 一、CloudBase 环境配置

### 1.1 开通云开发

1. 打开微信开发者工具，导入项目目录（选 `dist/` 作为 miniprogramRoot）
2. 填入你的 AppID
3. 点击工具栏「云开发」按钮 → 开通云开发 → 创建环境（如 `brain-test-env`）
4. 记下**环境 ID**（形如 `brain-test-xxx`）

### 1.2 创建数据库集合

在微信开发者工具 → 云开发控制台 → 数据库：

| 集合名 | 权限 | 说明 |
|--------|------|------|
| `questions` | 所有用户可读 | 题库 |
| `results` | 仅创建者可读写 | 成绩记录 |
| `share_posters` | 所有用户可读 | 分享海报缓存 |

或者调用 `setupDatabase` 云函数自动创建（见下方）。

### 1.3 替换配置占位符

编辑项目根目录的两个文件：

**`src/app.ts`** — 将 `{{CLOUDBASE_ENV_ID}}` 替换为实际环境 ID

**`project.config.json`** — 将 `{{WEAPP_APPID}}` 替换为实际 AppID

### 1.4 重新构建

```bash
npm run build:weapp
```

## 二、部署云函数

在微信开发者工具中，对 `cloud/functions/` 下的每个函数目录，右键 → **上传并部署**：

```
cloud/functions/
├── getQuestions/     # 随机抽题
├── saveResult/       # 保存成绩
├── generatePoster/   # 生成海报（需安装 canvas 依赖）
└── setupDatabase/    # 数据库初始化（仅运行一次）
```

**注意**：`generatePoster` 需要 `canvas` 依赖。在该函数目录下：

```bash
cd cloud/functions/generatePoster
npm init -y && npm install canvas
```

然后在微信开发者工具中右键部署（选择「上传所有文件」）。

## 三、导入题库

### 方式 A：通过云函数（推荐）

1. 部署 `setupDatabase` 云函数
2. 在小程序代码中调用（开发阶段在控制台执行即可）：

```javascript
// 在小程序 app.ts 的 componentDidMount 中临时添加
const questions = require('./data/questions.json');
wx.cloud.callFunction({
  name: 'setupDatabase',
  data: { action: 'seedQuestions', questions },
});
```

3. 导入后删除该临时代码

### 方式 B：通过 Node.js 脚本

```bash
# 安装依赖
npm install @cloudbase/node-sdk

# 设置环境变量
export CLOUDBASE_ENV_ID=brain-test-xxx
export TENCENTCLOUD_SECRETID=your-secret-id
export TENCENTCLOUD_SECRETKEY=your-secret-key

# 导入
node scripts/import_questions.mjs
```

## 四、上传题库图片（可选）

如果部分题目包含图片，将图片上传到云存储 `questions/` 目录，并在题目数据的 `content.image` 字段填入云文件 ID。

## 五、端到端验证

### 5.1 检查页面访问

在微信开发者工具中扫码预览，验证：

- [ ] 首页显示 3 个难度卡片，默认选中「中等」
- [ ] 点击「开始测试」进入答题页
- [ ] 答题页显示进度条、倒计时、4 个选项
- [ ] 点击选项有绿/红反馈，自动显示「下一题」按钮
- [ ] 每题 30 秒超时弹窗
- [ ] 10 题完成后跳转结果页
- [ ] 结果页显示分数、等级、统计
- [ ] 「生成分享海报」按钮可点击
- [ ] 「再做一次」返回首页

### 5.2 检查云端数据

在云开发控制台 → 数据库 → `results` 集合，确认有成绩记录写入。

### 5.3 检查评分算法

测试以下场景验证评分：
- 全部答对（10/10）→ 得分应 ≥ 100
- 全部答错（0/10）→ 得分 = 0
- 混合答卷 → 得分在 0-105 之间

## 六、注意事项

- 云开发免费额度：数据库 2GB、云函数调用 4 万次/月、存储 5GB
- 海报生成云函数每次调用约 200ms，注意频控
- 小程序需要备案域名才能正式上线（开发/体验版不受限）
- 瑞文测验题目受版权保护，商业使用请使用自编题目
