/**
 * CloudBase database setup — run this cloud function ONCE to create
 * the `questions` collection and optionally seed sample data.
 *
 * Deploy:
 *   1. Copy this file to cloud/functions/setupDatabase/index.js
 *   2. Create cloud/functions/setupDatabase/config.json (empty permissions)
 *   3. Right-click the function in WeChat DevTools → Upload & Deploy
 *   4. Call it once from the mini program or CloudBase console
 */

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { action = 'createCollections' } = event;

  if (action === 'createCollections') {
    // CloudBase auto-creates collections on first add().
    // Try adding a placeholder doc to force collection creation.
    const collections = ['questions', 'results', 'share_posters'];

    for (const name of collections) {
      try {
        await db.collection(name).add({
          data: {
            _placeholder: true,
            created_at: db.serverDate(),
          },
        });
        console.log(`Collection '${name}' ready`);
      } catch (e) {
        // Collection may already exist — that's fine
        console.log(`Collection '${name}': ${e.message}`);
      }
    }

    // Clean up placeholders
    for (const name of collections) {
      const { data } = await db.collection(name)
        .where({ _placeholder: true })
        .get();
      for (const doc of data) {
        await db.collection(name).doc(doc._id).remove();
      }
    }

    return { ok: true, collections };
  }

  if (action === 'seedQuestions') {
    const questions = event.questions || [];
    let count = 0;
    for (const q of questions) {
      const { _id, ...data } = q;
      await db.collection('questions').add({ data });
      count++;
    }
    return { ok: true, imported: count };
  }

  return { ok: false, error: 'Unknown action' };
};
