const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { PORT } = require('./config/env');
const { connectDb } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json({ error: err.message || 'Internal Server Error' });
});

connectDb().finally(() => {
	app.listen(PORT, () => {
		console.log(`API listening on http://localhost:${PORT}`);
	});
});
