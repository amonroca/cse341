const router = require('express').Router();
const { fetchAllContacts, fetchContactById, addContact, editContact, removeContact } = require('../controllers/contactsController');

router.get('/', /* #swagger.tags = ['Contacts'] */ fetchAllContacts);
router.get('/:id', /* #swagger.tags = ['Contacts'] */ /* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */ fetchContactById);
router.post('/',
	/* #swagger.tags = ['Contacts'] */
	/* #swagger.parameters['body'] = {
				in: 'body',
		schema: {
			firstName: 'Amon',
			lastName: 'Roca',
			email: 'amon.roca@example.com',
			favoriteColor: 'Blue',
			birthday: '1988-07-12'
		}
		}
	*/
	addContact
);
router.put('/:id',
	/* #swagger.tags = ['Contacts'] */
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */
	/* #swagger.parameters['body'] = {
				in: 'body',
		schema: {
			firstName: 'Amon',
			lastName: 'Roca',
			email: 'amon.roca@example.com',
			favoriteColor: 'Green',
			birthday: '1988-07-12'
		}
		}
	*/
	editContact
);
router.delete('/:id', /* #swagger.tags = ['Contacts'] */ /* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */ removeContact);

module.exports = router;