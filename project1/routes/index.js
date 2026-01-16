const router = require('express').Router();
const contactsRouter = require('./contacts');

router.use('/contacts', contactsRouter);

module.exports = router;