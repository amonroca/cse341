const COLLECTION_NAME = 'users';

async function selectAllUsers(db) {
  const col = db.collection(COLLECTION_NAME);
  return col.find({}).toArray();
}

async function selectUserById(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.findOne({ _id: id });
}

async function insertUser(db, user) {
  const col = db.collection(COLLECTION_NAME);
  const result = await col.insertOne(user);
  return { _id: result.insertedId };
}

async function updateUser(db, id, updatedUser) {
  const col = db.collection(COLLECTION_NAME);
  return col.updateOne({ _id: id }, { $set: updatedUser });
}

async function deleteUser(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.deleteOne({ _id: id });
}

module.exports = { selectAllUsers, selectUserById, insertUser, updateUser, deleteUser };