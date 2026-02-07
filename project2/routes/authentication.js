const router = require('express').Router();
const passport = require('passport');

router.get('/login', /*
    #swagger.tags = ['Authentication']
    #swagger.description = 'Initiates GitHub OAuth authentication flow. Redirects user to GitHub for login.'
    #swagger.responses[302] = { description: 'Redirect to GitHub for authentication' }
*/ passport.authenticate('github'));

router.get('/logout', /*
    #swagger.tags = ['Authentication']
    #swagger.description = 'Logs out the current user and destroys the session.'
    #swagger.responses[200] = { description: 'User logged out successfully' }
    #swagger.responses[500] = { description: 'Logout failed' }
*/ (req, res) => {
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