const router = require('express').Router();
const usersRouter = require('./users');
const coursesRouter = require('./courses');
const assignmentsRouter = require('./assignments');
const authenticationRouter = require('./authentication');
const passport = require('passport');

router.use('/users', usersRouter);
router.use('/courses', coursesRouter);
router.use('/assignments', assignmentsRouter);
router.use('/auth', authenticationRouter);

module.exports = router;