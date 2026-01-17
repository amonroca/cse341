const COLLECTION_NAME = 'contacts';

async function getAllContacts(db) {
  const col = db.collection(COLLECTION_NAME);
  return col.find({}).toArray();
}

async function getContactById(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.findOne({ _id: id });
}


async function insertContact(db, contact) {
  const col = db.collection(COLLECTION_NAME);
  const result = await col.insertOne(contact);
  return { _id: result.insertedId };
}

async function updateContact(db, id, updatedContact) {
  const col = db.collection(COLLECTION_NAME);
  return col.updateOne({ _id: id }, { $set: updatedContact });
}

async function deleteContact(db, id) {
  const col = db.collection(COLLECTION_NAME);
  return col.deleteOne({ _id: id });
}

module.exports = { getAllContacts, getContactById, insertContact, updateContact, deleteContact };