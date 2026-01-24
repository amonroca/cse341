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
  const result = await col.insertOne(assignment);
  return { _id: result.insertedId };
}

async function updateAssignment(db, id, updatedAssignment) {
  const col = db.collection(COLLECTION_NAME);
  return col.updateOne({ _id: id }, { $set: updatedAssignment });
}

async function deleteAssignment(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.deleteOne({ _id: id });
}

module.exports = { selectAllAssignments, selectAssignmentById, insertAssignment, updateAssignment, deleteAssignment };