const dotenv = require('dotenv');

dotenv.config();

// Porta fixa conforme solicitação
const PORT = 8080;
const FRONTEND_URLS = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

module.exports = { PORT, FRONTEND_URLS };