const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { difficulty, count = 10 } = event;

  const { total } = await db.collection('questions')
    .where({ difficulty })
    .count();

  if (total === 0) {
    return { questions: [] };
  }

  const skip = Math.max(0, Math.floor(Math.random() * (total - count)));
  const { data } = await db.collection('questions')
    .where({ difficulty })
    .skip(skip)
    .limit(count)
    .get();

  const shuffled = data.sort(() => Math.random() - 0.5);

  return { questions: shuffled };
};
