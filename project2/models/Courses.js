const COLLECTION_NAME = 'courses';

async function selectAllCourses(db) {
  const col = db.collection(COLLECTION_NAME);
  return col.find({}).toArray();
}

async function selectCourseById(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.findOne({ _id: id });
}

async function insertCourse(db, course) {
  const col = db.collection(COLLECTION_NAME);
  const now = new Date();
  const doc = { ...course, createdAt: now, updatedAt: now };
  const result = await col.insertOne(doc);
  return { _id: result.insertedId };
}

async function updateCourse(db, id, updatedCourse) {
  const col = db.collection(COLLECTION_NAME);
  const now = new Date();
  const setDoc = { ...updatedCourse, updatedAt: now };
  return col.updateOne({ _id: id }, { $set: setDoc });
}

async function deleteCourse(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.deleteOne({ _id: id });
}

module.exports = { selectAllCourses, selectCourseById, insertCourse, updateCourse, deleteCourse };