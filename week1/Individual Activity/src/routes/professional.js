const { Router } = require('express');
const { getProfessional, upsertProfessional } = require('../controllers/professionalController');

const router = Router();

router.get('/', getProfessional);
router.post('/', upsertProfessional);
router.put('/', upsertProfessional);

module.exports = router;