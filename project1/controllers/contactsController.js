const {getAllContacts, getContactById} = require('../models/Contacts');
const {getConnectionState, getDb} = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

async function fetchAllContacts(req, res, next) {
  try {
    if (getConnectionState()) {
      const contacts = await getAllContacts(getDb());
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(contacts);
    }
    return res.status(503).json({error: 'Database unavailable'});
  } catch (err) {
    next(err);
  }
}

async function fetchContactById(req, res, next) {
  try {
    if (getConnectionState()) {
      const contact = await getContactById(getDb(), new ObjectId(req.params.id));
      if (contact) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(contact);
      } else {
        return res.status(404).json({ error: 'Contact not found' });
      }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

module.exports = { fetchAllContacts, fetchContactById };