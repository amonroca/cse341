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
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    description: req.body.description,
    credits: req.body.credits,
    instructorId: new ObjectId(req.body.instructorId),
    semester: req.body.semester,
    prerequisites: (req.body.prerequisites || []).map(id => new ObjectId(id)),
    enrolledStudents: (req.body.enrolledStudents || []).map(id => new ObjectId(id))
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
  const courseData = {};
  if (req.body.courseCode !== undefined) courseData.courseCode = req.body.courseCode;
  if (req.body.courseName !== undefined) courseData.courseName = req.body.courseName;
  if (req.body.description !== undefined) courseData.description = req.body.description;
  if (req.body.credits !== undefined) courseData.credits = req.body.credits;
  if (req.body.instructorId !== undefined) courseData.instructorId = new ObjectId(req.body.instructorId);
  if (req.body.semester !== undefined) courseData.semester = req.body.semester;
  if (req.body.prerequisites !== undefined) courseData.prerequisites = (req.body.prerequisites || []).map(id => new ObjectId(id));
  if (req.body.enrolledStudents !== undefined) courseData.enrolledStudents = (req.body.enrolledStudents || []).map(id => new ObjectId(id));
  try {
    if (getConnectionState()) {
        const updatedCourse = await Courses.updateCourse(getDb(), new ObjectId(req.params.id), courseData);
        if (updatedCourse && updatedCourse.matchedCount > 0) {
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
        if (deletedCourse && deletedCourse.deletedCount > 0) {
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