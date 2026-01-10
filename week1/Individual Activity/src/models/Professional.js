const COLLECTION_NAME = 'professionals';

async function getLatestProfessional(db) {
  const col = db.collection(COLLECTION_NAME);
  return col.findOne({});
}

async function upsertProfessional(db, payload) {
  const col = db.collection(COLLECTION_NAME);
  const result = await col.findOneAndUpdate(
    {},
    { $set: { ...payload, updatedAt: new Date() } },
    { upsert: true, returnDocument: 'after' }
  );
  return result.value || payload;
}

module.exports = { COLLECTION_NAME, getLatestProfessional, upsertProfessional };