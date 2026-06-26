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
