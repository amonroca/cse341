const router = require('express').Router();
const { fetchAllCourses, fetchCourseById, addCourse, editCourse, removeCourse } = require('../controllers/coursesController');

router.get('/', /* #swagger.tags = ['Courses'] */ fetchAllCourses);
router.get('/:id', /* #swagger.tags = ['Courses'] */ fetchCourseById);
router.post('/', /* #swagger.tags = ['Courses'] */ addCourse);
router.put('/:id', /* #swagger.tags = ['Courses'] */ editCourse);
router.delete('/:id', /* #swagger.tags = ['Courses'] */ removeCourse);

module.exports = router;