const { MongoClient } = require('mongodb');

let client;
let db;
let isConnected = false;

async function connectDb(uri = process.env.DATABASE_URL) {
  if (!uri) {
    console.warn('DATABASE_URL not set. Skipping MongoDB connection.');
    return;
  }
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
    isConnected = true;
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
  }
}

function getDb() {
  return db;
}

function getConnectionState() {
  return isConnected;
}

async function disconnectDb() {
  if (client) {
    await client.close();
    isConnected = false;
  }
}

module.exports = { connectDb, getDb, getConnectionState, disconnectDb };