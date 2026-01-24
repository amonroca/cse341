const router = require('express').Router();
const { fetchAllUsers, fetchUserById, addUser, editUser, removeUser } = require('../controllers/usersController');

router.get('/', /* #swagger.tags = ['Users'] */ fetchAllUsers);
router.get('/:id', /* #swagger.tags = ['Users'] */ fetchUserById);
router.post('/', /* #swagger.tags = ['Users'] */ addUser);
router.put('/:id', /* #swagger.tags = ['Users'] */ editUser);
router.delete('/:id', /* #swagger.tags = ['Users'] */ removeUser);

module.exports = router;