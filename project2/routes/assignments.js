const router = require('express').Router();
const { fetchAllAssignments, fetchAssignmentById, addAssignment, editAssignment, removeAssignment } = require('../controllers/assignmentsController');
const { idParamValidator, handleValidationResult, createAssignmentValidators, updateAssignmentValidators } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Apply authentication middleware to all routes in this router
router.use(isAuthenticated);

router.get('/', /* 
	#swagger.tags = ['Assignments']
	#swagger.responses[200] = { description: 'Assignments retrieved successfully' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ fetchAllAssignments);

router.get('/:id', /* 
	#swagger.tags = ['Assignments']
	#swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Assignment ID (ObjectId)' }
	#swagger.responses[200] = { description: 'Assignment retrieved successfully' }
	#swagger.responses[404] = { description: 'Assignment not found' }
	#swagger.responses[400] = { description: 'Invalid ID' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ idParamValidator, handleValidationResult, fetchAssignmentById);

router.post('/', /* 
	#swagger.tags = ['Assignments']
	#swagger.parameters['body'] = {
		in: 'body', required: true, description: 'Assignment creation payload',
		schema: { 
			courseId: '60f6c9c8f1f1f1f1f1f1f1f1', 
			title: 'HW 1', 
			description: 'Solve problems', 
			dueDate: '2026-01-31T23:59:59Z', 
			maxScore: 100, 
			submissions: [
				{ studentId: '60f6c9c8f1f1f1f1f1f1f1f1', submittedAt: '2026-01-30T12:00:00Z', score: 95, feedback: 'Good job' }
			]
		}
	}
	#swagger.responses[201] = { description: 'Assignment created' }
	#swagger.responses[400] = { description: 'Validation errors in payload' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ createAssignmentValidators, handleValidationResult, addAssignment);

router.put('/:id', /* 
	#swagger.tags = ['Assignments']
	#swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Assignment ID (ObjectId)' }
	#swagger.parameters['body'] = {
		in: 'body', required: true, description: 'Fields for partial update',
		schema: { 
            title: 'HW 1 Updated', 
            description: 'Updated desc', 
            dueDate: '2026-02-01T23:59:59Z', 
            maxScore: 120, 
            submissions: [
                {studentId: '60f6c9c8f1f1f1f1f1f1f1f1', submittedAt: '2026-01-30T12:00:00Z', score: 95, feedback: 'Good job'}
            ] 
        }
	}
	#swagger.responses[200] = { description: 'Assignment updated successfully' }
	#swagger.responses[400] = { description: 'Invalid ID or validation errors' }
	#swagger.responses[404] = { description: 'Assignment not found' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ idParamValidator, updateAssignmentValidators, handleValidationResult, editAssignment);

router.delete('/:id', /* 
	#swagger.tags = ['Assignments']
	#swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Assignment ID (ObjectId)' }
	#swagger.responses[200] = { description: 'Assignment deleted successfully' }
	#swagger.responses[400] = { description: 'Invalid ID' }
	#swagger.responses[404] = { description: 'Assignment not found' }
	#swagger.responses[503] = { description: 'Database unavailable' }
*/ idParamValidator, handleValidationResult, removeAssignment);

module.exports = router;