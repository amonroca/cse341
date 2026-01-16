const COLLECTION_NAME = 'contacts';

async function getAllContacts(db) {
  const col = db.collection(COLLECTION_NAME);
  return col.find({}).toArray();
}

async function getContactById(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.findOne({ _id: id });
}

module.exports = { getAllContacts, getContactById };