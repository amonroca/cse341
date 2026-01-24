const {getAllContacts, getContactById, insertContact, updateContact, deleteContact} = require('../models/Contacts');
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

async function addContact(req, res, next) {
  const contactData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  try {
    if (getConnectionState()) {
      const newContact = await insertContact(getDb(), contactData);
      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json(newContact);
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function editContact(req, res, next) {
  // Only include fields that are present in the request body
  const allowedFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
  const contactData = {};
  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(req.body, field) && req.body[field] !== undefined) {
      contactData[field] = req.body[field];
    }
  }
  if (Object.keys(contactData).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided for update' });
  }
  try {
    if (getConnectionState()) {
      const result = await updateContact(getDb(), new ObjectId(req.params.id), contactData);
      if (!result || result.matchedCount === 0) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(result);
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function removeContact(req, res, next) {
  try {
    if (getConnectionState()) {
      const result = await deleteContact(getDb(), new ObjectId(req.params.id));
      if (result.deletedCount === 1) {
        return res.status(204).end();
      } else {
        return res.status(404).json({ error: 'Contact not found' });
      }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

module.exports = { fetchAllContacts, fetchContactById, addContact, editContact, removeContact };