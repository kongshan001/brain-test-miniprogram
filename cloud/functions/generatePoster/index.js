const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { resultId } = event;

  const { data: result } = await db.collection('results').doc(resultId).get();
  if (!result) throw new Error('Result not found');

  // Generate poster using canvas
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(750, 1334);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 600);
  gradient.addColorStop(0, '#2563EB');
  gradient.addColorStop(1, '#7C3AED');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 750, 600);

  // Title
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('脑力测试报告', 375, 100);

  // Score
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 160px sans-serif';
  ctx.fillText(String(result.score), 375, 360);

  // Grade
  ctx.font = '32px sans-serif';
  ctx.fillText('等级 A · 才思敏捷', 375, 440);

  // Stats
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '24px sans-serif';
  const correct = result.answers.filter(a => a.correct).length;
  ctx.fillText(`答对 ${correct} 题`, 375, 510);

  // White bottom
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 620, 750, 714);

  // Upload to cloud storage
  const buffer = canvas.toBuffer('image/png');
  const cloudPath = `posters/${resultId}.png`;
  await cloud.uploadFile({
    cloudPath,
    fileContent: buffer,
  });

  // Get temp URL
  const { fileList } = await cloud.getTempFileURL({
    fileList: [cloudPath],
  });

  const posterUrl = fileList[0].tempFileURL;

  // Save poster record
  await db.collection('share_posters').add({
    data: {
      result_id: resultId,
      cloud_path: cloudPath,
      created_at: db.serverDate(),
    },
  });

  return { posterUrl };
};
