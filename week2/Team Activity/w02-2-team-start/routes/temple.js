const routes = require('express').Router();
const { body, param, header } = require('express-validator');
const validate = require('../middleware/validate');
const requireApiKey = require('../middleware/requireApiKey');
const temples = require('../controllers/temple.js');

const EXPECTED_API_KEY = process.env.API_KEY;

routes.get(
	'/',
	[header('apiKey').notEmpty().withMessage('apiKey header is required'), validate, requireApiKey(EXPECTED_API_KEY)],
	temples.findAll
);
routes.get(
	'/:temple_id',
	[
		header('apiKey').notEmpty().withMessage('apiKey header is required'),
		param('temple_id').isInt().withMessage('temple_id must be an integer'),
		validate,
		requireApiKey(EXPECTED_API_KEY),
	],
	temples.findOne
);

routes.post(
	'/',
	[
		body('temple_id').isInt().withMessage('temple_id must be an integer'),
		body('name').isString().notEmpty().withMessage('name is required'),
		body('location').isString().notEmpty().withMessage('location is required'),
		body('description').optional().isString().withMessage('description must be string'),
		validate,
	],
	temples.create
);

module.exports = routes;
