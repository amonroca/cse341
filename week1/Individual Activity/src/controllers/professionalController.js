const { getConnectionState, getDb } = require('../config/db');
const { getLatestProfessional, upsertProfessional: upsertProfessionalModel } = require('../models/Professional');

function validatePayload(payload) {
  const required = [
    'professionalName', 'base64Image', 'nameLink', 'primaryDescription',
    'workDescription1', 'workDescription2', 'linkTitleText',
    'linkedInLink', 'githubLink',
  ];
  for (const f of required) {
    if (!(f in payload)) return `Campo obrigatório ausente: ${f}`;
  }
  return null;
}

async function getProfessional(req, res, next) {
  try {
    if (getConnectionState()) {
      const doc = await getLatestProfessional(getDb());
      if (!doc) return res.status(404).json({ error: 'Profile not found' });
      return res.json(doc);
    }
    // No DB connection
    return res.status(503).json({ error: 'Database unavailable' });
  } catch (err) {
    next(err);
  }
}

async function upsertProfessional(req, res, next) {
  try {
    const payload = req.body;
    const errMsg = validatePayload(payload);
    if (errMsg) {
      const e = new Error(errMsg);
      e.status = 400;
      throw e;
    }

    if (getConnectionState()) {
      const saved = await upsertProfessionalModel(getDb(), payload);
      return res.json(saved);
    }
    // No DB connection
    const e = new Error('Database unavailable');
    e.status = 503;
    throw e;
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfessional, upsertProfessional };