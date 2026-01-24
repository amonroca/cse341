const router = require('express').Router();
const { fetchAllAssignments, fetchAssignmentById, addAssignment, editAssignment, removeAssignment } = require('../controllers/assignmentsController');

router.get('/', /* #swagger.tags = ['Assignments'] */ fetchAllAssignments);
router.get('/:id', /* #swagger.tags = ['Assignments'] */ fetchAssignmentById);
router.post('/', /* #swagger.tags = ['Assignments'] */ addAssignment);
router.put('/:id', /* #swagger.tags = ['Assignments'] */ editAssignment);
router.delete('/:id', /* #swagger.tags = ['Assignments'] */ removeAssignment);

module.exports = router;