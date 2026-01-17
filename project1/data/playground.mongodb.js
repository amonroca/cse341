/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('cse341');

// Insert a few documents into the sales collection.
db.getCollection('contacts').insertMany([
  { 'contactId': 1, 'firstName': 'John', 'lastName': 'Doe', 'email': 'john.doe@example.com', 'favoriteColor': 'blue', 'birthday': '1990-01-01' },
  { 'contactId': 2, 'firstName': 'Jane', 'lastName': 'Smith', 'email': 'jane.smith@example.com', 'favoriteColor': 'green', 'birthday': '1985-05-15' },
  { 'contactId': 3, 'firstName': 'Alice', 'lastName': 'Johnson', 'email': 'alice.johnson@example.com', 'favoriteColor': 'red', 'birthday': '1992-09-23' },
  { 'contactId': 4, 'firstName': 'Bob', 'lastName': 'Brown', 'email': 'bob.brown@example.com', 'favoriteColor': 'yellow', 'birthday': '1988-12-12' },
  { 'contactId': 5, 'firstName': 'Charlie', 'lastName': 'Davis', 'email': 'charlie.davis@example.com', 'favoriteColor': 'purple', 'birthday': '1991-07-07' },
  { 'contactId': 6, 'firstName': 'Eve', 'lastName': 'Miller', 'email': 'eve.miller@example.com', 'favoriteColor': 'orange', 'birthday': '1993-03-03' },
  { 'contactId': 7, 'firstName': 'Frank', 'lastName': 'Wilson', 'email': 'frank.wilson@example.com', 'favoriteColor': 'pink', 'birthday': '1994-11-11' },
  { 'contactId': 8, 'firstName': 'Grace', 'lastName': 'Moore', 'email': 'grace.moore@example.com', 'favoriteColor': 'cyan', 'birthday': '1995-06-06' },
  { 'contactId': 9, 'firstName': 'Hank', 'lastName': 'Taylor', 'email': 'hank.taylor@example.com', 'favoriteColor': 'magenta', 'birthday': '1996-08-08' },
  { 'contactId': 10, 'firstName': 'Ivy', 'lastName': 'Anderson', 'email': 'ivy.anderson@example.com', 'favoriteColor': 'lime', 'birthday': '1997-04-04' }
]);

// Find all documents in the contacts collection.
db.getCollection('contacts').find({});

// Find contacts with favoriteColor 'blue'.
db.getCollection('contacts').find({ 'favoriteColor': 'blue' });

// Find contacts born after 1990-01-01.
db.getCollection('contacts').find({ 'birthday': { $gt: '1990-01-01' } });

// Find a contact by id.
db.getCollection('contacts').find({ 'contactId': 3 });

db.getCollection('contacts').insertOne({ 'contactId': 11, 'firstName': 'Jack', 'lastName': 'White', 'email': 'jack.white@example.com', 'favoriteColor': 'black', 'birthday': '1998-10-10' });
