const COLLECTION_NAME = 'assignments';

async function selectAllAssignments(db) {
  const col = db.collection(COLLECTION_NAME);
  return col.find({}).toArray();
}

async function selectAssignmentById(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.findOne({ _id: id });
}

async function insertAssignment(db, assignment) {
  const col = db.collection(COLLECTION_NAME);
  const now = new Date();
  const doc = { ...assignment, createdAt: now, updatedAt: now };
  const result = await col.insertOne(doc);
  return { _id: result.insertedId };
}

async function updateAssignment(db, id, updatedAssignment) {
  const col = db.collection(COLLECTION_NAME);
  const now = new Date();
  const setDoc = { ...updatedAssignment, updatedAt: now };
  return col.updateOne({ _id: id }, { $set: setDoc });
}

async function deleteAssignment(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.deleteOne({ _id: id });
}

module.exports = { selectAllAssignments, selectAssignmentById, insertAssignment, updateAssignment, deleteAssignment };