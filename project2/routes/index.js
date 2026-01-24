const router = require('express').Router();
const usersRouter = require('./users');
const coursesRouter = require('./courses');
const assignmentsRouter = require('./assignments');

router.use('/users', usersRouter);
router.use('/courses', coursesRouter);
router.use('/assignments', assignmentsRouter);

module.exports = router;