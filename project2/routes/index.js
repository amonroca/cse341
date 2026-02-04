const router = require('express').Router();
const usersRouter = require('./users');
const coursesRouter = require('./courses');
const assignmentsRouter = require('./assignments');
const passport = require('passport');

router.use('/users', usersRouter);
router.use('/courses', coursesRouter);
router.use('/assignments', assignmentsRouter);

router.get('/login', passport.authenticate('github'), (req, res) => {
    // This function will not be called as the request will be redirected to GitHub for authentication
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;