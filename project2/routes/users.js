const router = require('express').Router();
const { fetchAllUsers, fetchUserById, addUser, editUser, removeUser } = require('../controllers/usersController');
const { 
	createUserValidators, 
	updateUserValidators, 
	idParamValidator, 
	handleValidationResult 
} = require('../middleware/validate');

router.get('/', /* 
	#swagger.tags = ['Users']
	#swagger.responses[200] = {
		description: 'Users retrieved successfully',
		schema: [{ _id: '60f6c9c8f1f1f1f1f1f1f1f1', name: 'Alice', email: 'alice@example.com', role: 'student', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' }]
	}
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ fetchAllUsers);

router.get('/:id', /* 
	#swagger.tags = ['Users']
	#swagger.parameters['id'] = { in: 'path', description: 'User ID (ObjectId)', required: true, type: 'string' }
	#swagger.responses[200] = {
		description: 'User retrieved successfully',
		schema: { _id: '60f6c9c8f1f1f1f1f1f1f1f1', name: 'Alice', email: 'alice@example.com', role: 'student', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' }
	}
	#swagger.responses[400] = { description: 'Invalid ID' }
	#swagger.responses[404] = { description: 'User not found' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ idParamValidator, handleValidationResult, fetchUserById);

router.post('/', /* 
	#swagger.tags = ['Users']
	#swagger.parameters['body'] = {
		in: 'body',
		required: true,
		description: 'Data for user creation',
		schema: { 
			name: 'Jenifer', 
			email: 'jenifer@example.com', 
			role: 'student'
		}
	}
	#swagger.responses[201] = { description: 'User created', schema: { _id: '60f6c9c8f1f1f1f1f1f1f1f1' } }
	#swagger.responses[400] = { description: 'Validation errors in payload' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ createUserValidators, handleValidationResult, addUser);

router.put('/:id', /* 
	#swagger.tags = ['Users']
	#swagger.parameters['id'] = { in: 'path', description: 'User ID (ObjectId)', required: true, type: 'string' }
	#swagger.parameters['body'] = {
		in: 'body',
		required: true,
		description: 'Fields for partial update',
		schema: { name: ' Jenifer Updated', email: 'jenifer.updated@example.com' }
	}
	#swagger.responses[200] = { description: 'User updated successfully' }
	#swagger.responses[400] = { description: 'Invalid ID or validation errors' }
	#swagger.responses[404] = { description: 'User not found' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ idParamValidator, updateUserValidators, handleValidationResult, editUser);

router.delete('/:id', /* 
	#swagger.tags = ['Users']
	#swagger.parameters['id'] = { in: 'path', description: 'User ID (ObjectId)', required: true, type: 'string' }
	#swagger.responses[200] = { description: 'User deleted successfully' }
	#swagger.responses[400] = { description: 'Invalid ID' }
	#swagger.responses[404] = { description: 'User not found' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ idParamValidator, handleValidationResult, removeUser);

module.exports = router;