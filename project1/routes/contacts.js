const router = require('express').Router();
const { fetchAllContacts, fetchContactById } = require('../controllers/contactsController');

router.get('/', fetchAllContacts);
router.get('/:id', fetchContactById);

module.exports = router;