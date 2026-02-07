const router = require('express').Router();
const { fetchAllCourses, fetchCourseById, addCourse, editCourse, removeCourse } = require('../controllers/coursesController');
const { idParamValidator, handleValidationResult, createCourseValidators, updateCourseValidators } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Apply authentication middleware to all routes in this router
router.use(isAuthenticated);

router.get('/', /* 
	#swagger.tags = ['Courses']
	#swagger.responses[200] = { description: 'Courses retrieved successfully' }
	#swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
	#swagger.responses[503] = { description: 'Service Unavailable' }
*/ fetchAllCourses);

router.get('/:id', /* 
	#swagger.tags = ['Courses']
	#swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Course ID (ObjectId)' }
	#swagger.responses[200] = { description: 'Course retrieved successfully' }
	#swagger.responses[404] = { description: 'Not Found' }
	#swagger.responses[400] = { description: 'Invalid ID' }
	#swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
	#swagger.responses[503] = { description: 'Service Unavailable' }
*/ idParamValidator, handleValidationResult, fetchCourseById);

router.post('/', /* 
	#swagger.tags = ['Courses']
	#swagger.parameters['body'] = {
		in: 'body', required: true, description: 'Course creation payload',
		schema: { 
            courseCode: 'CSE341', 
            courseName: 'CSE341 Web Backend',
            description: 'Web Backend Development Course', 
            credits: 3, 
            instructorId: '60f6c9c8f1f1f1f1f1f1f1f1', 
            semester: 'Fall 2024'
         }
	}
	#swagger.responses[201] = { description: 'Course created' }
	#swagger.responses[400] = { description: 'Validation errors in payload' }
	#swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
	#swagger.responses[503] = { description: 'Service Unavailable' }
*/ createCourseValidators, handleValidationResult, addCourse);

router.put('/:id', /* 
	#swagger.tags = ['Courses']
	#swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Course ID (ObjectId)' }
	#swagger.parameters['body'] = {
		in: 'body', required: true, description: 'Fields for partial update',
		schema: { 
            courseCode: 'CSE341',
            courseName: 'CSE341 Advanced Web Backend', 
            description: 'Updated desc', 
            credits: 4, 
            instructorId: '60f6c9c8f1f1f1f1f1f1f1f1', 
            semester: 'Spring 2025', 
            prerequisites: ['60f6c9c8f1f1f1f1f1f1f1f1'], 
            enrolledStudents: ['60f6c9c8f1f1f1f1f1f1f1f1'] 
        }
	}
	#swagger.responses[200] = { description: 'Course updated successfully' }
	#swagger.responses[400] = { description: 'Invalid ID or validation errors' }
	#swagger.responses[404] = { description: 'Not Found' }
	#swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
	#swagger.responses[503] = { description: 'Service Unavailable' }
*/ idParamValidator, updateCourseValidators, handleValidationResult, editCourse);

router.delete('/:id', /* 
	#swagger.tags = ['Courses']
	#swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Course ID (ObjectId)' }
	#swagger.responses[200] = { description: 'Course deleted successfully' }
	#swagger.responses[400] = { description: 'Invalid ID' }
	#swagger.responses[404] = { description: 'Not Found' }
	#swagger.responses[401] = { description: 'Unauthorized - Authentication required' }
	#swagger.responses[503] = { description: 'Service Unavailable' }
*/ idParamValidator, handleValidationResult, removeCourse);

module.exports = router;