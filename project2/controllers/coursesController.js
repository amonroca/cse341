const Courses = require('../models/Courses');
const { getConnectionState, getDb } = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

async function fetchAllCourses(req, res, next) {
  try {
    if (getConnectionState()) {
      const courses = await Courses.selectAllCourses(getDb());
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(courses);
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function fetchCourseById(req, res, next) {
  try {
    if (getConnectionState()) {
        const course = await Courses.selectCourseById(getDb(), new ObjectId(req.params.id));
        if (course) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json(course);
        } else {
            return res.status(404).json({ error: 'Course not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function addCourse(req, res, next) {
  const courseData = {
    name: req.body.name,
    description: req.body.description,
    credits: req.body.credits,
  };
  try {
    if (getConnectionState()) {
      const result = await Courses.insertCourse(getDb(), courseData);
      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json({ _id: result._id });
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function editCourse(req, res, next) {
  try {
    if (getConnectionState()) {
        const updatedCourse = await Courses.updateCourse(getDb(), new ObjectId(req.params.id), req.body);
        if (updatedCourse) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: 'Course updated successfully' });
        } else {
            return res.status(404).json({ error: 'Course not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function removeCourse(req, res, next) {
  try {
    if (getConnectionState()) {
        const deletedCourse = await Courses.deleteCourse(getDb(), new ObjectId(req.params.id));
        if (deletedCourse) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: 'Course deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Course not found' });
        }
    }
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

module.exports = { fetchAllCourses, fetchCourseById, addCourse, editCourse, removeCourse };