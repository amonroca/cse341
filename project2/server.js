const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { connectDb, disconnectDb } = require('./data/database');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out');
});

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

const port = process.env.PORT || 8080;

app.use('/', require('./routes'));

let server;

async function startWithRetry(maxRetries = 3, baseDelayMs = 500) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await connectDb();
      server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      return; // started successfully
    } catch (err) {
      const isLast = attempt === maxRetries;
      const delay = Math.min(5000, baseDelayMs * Math.pow(2, attempt - 1));
      console.error(
        `DB connection attempt ${attempt}/${maxRetries} failed: ${err.message}`
      );
      if (isLast) {
        console.error('Max retries reached. Exiting process.');
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

// Graceful shutdown
async function shutdown(signal) {
  try {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log('HTTP server closed.');
    }
    await disconnectDb();
  } catch (err) {
    console.error('Error during shutdown:', err.message);
  } finally {
    process.exit(0);
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startWithRetry();