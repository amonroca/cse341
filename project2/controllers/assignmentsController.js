const Assignments = require('../models/Assignments');
const { getConnectionState, getDb } = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

async function fetchAllAssignments(req, res, next) {
  try {
    if (getConnectionState()) {
      const assignments = await Assignments.selectAllAssignments(getDb());
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(assignments);
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function fetchAssignmentById(req, res, next) {
  try {
    if (getConnectionState()) {
        const assignment = await Assignments.selectAssignmentById(getDb(), new ObjectId(req.params.id));
        if (assignment) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json(assignment);
        } else {
            return res.status(404).json({ error: 'Assignment not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function addAssignment(req, res, next) {
  const assignmentData = {
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    courseId: req.body.courseId,
  };
  try {
    if (getConnectionState()) {
      const result = await Assignments.insertAssignment(getDb(), assignmentData);
      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json({ _id: result._id });
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function editAssignment(req, res, next) {
  try {
    if (getConnectionState()) {
        const updatedAssignment = await Assignments.updateAssignment(getDb(), new ObjectId(req.params.id), req.body);
        if (updatedAssignment) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: 'Assignment updated successfully' });
        } else {
            return res.status(404).json({ error: 'Assignment not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function removeAssignment(req, res, next) {
  try {
    if (getConnectionState()) {
        const result = await Assignments.deleteAssignment(getDb(), new ObjectId(req.params.id));
        if (result.deletedCount > 0) {
            return res.status(200).json({ message: 'Assignment deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Assignment not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

module.exports = { fetchAllAssignments, fetchAssignmentById, addAssignment, editAssignment, removeAssignment };