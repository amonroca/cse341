const router = require('express').Router();
const { fetchAllContacts, fetchContactById, addContact, editContact, removeContact } = require('../controllers/contactsController');

router.get('/', fetchAllContacts);
router.get('/:id', fetchContactById);
router.post('/', addContact);
router.put('/:id', editContact);
router.delete('/:id', removeContact);

module.exports = router;