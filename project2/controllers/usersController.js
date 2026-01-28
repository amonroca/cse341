const Users = require('../models/Users');
const { getConnectionState, getDb } = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

async function fetchAllUsers(req, res, next) {
  try {
    if (getConnectionState()) {
      const users = await Users.selectAllUsers(getDb());
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(users);
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function fetchUserById(req, res, next) {
  try {
    if (getConnectionState()) {
        const user = await Users.selectUserById(getDb(), new ObjectId(req.params.id));
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function addUser(req, res, next) {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  try {
    if (getConnectionState()) {
      const result = await Users.insertUser(getDb(), userData);
      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json({ _id: result._id });
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function editUser(req, res, next) {
  const userData = {};
  if (req.body.name !== undefined) userData.name = req.body.name;
  if (req.body.email !== undefined) userData.email = req.body.email;
  try {
    if (getConnectionState()) {
        const updatedUser = await Users.updateUser(getDb(), new ObjectId(req.params.id), userData);
        if (updatedUser && updatedUser.matchedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function removeUser(req, res, next) {
  try {
    if (getConnectionState()) {
        const result = await Users.deleteUser(getDb(), new ObjectId(req.params.id));
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

module.exports = { fetchAllUsers, fetchUserById, addUser, editUser, removeUser };