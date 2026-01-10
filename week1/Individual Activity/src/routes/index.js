const { Router } = require('express');
const professionalRouter = require('./professional');

const router = Router();

router.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

router.use('/professional', professionalRouter);

module.exports = router;
