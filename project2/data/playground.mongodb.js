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
db.getCollection('users').insertMany([
    { 'oauthId': '12345', 'name': 'Alice', 'email': 'alice@example.com', 'role': 'student', 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'oauthId': '67890', 'name': 'Bob', 'email': 'bob@example.com', 'role': 'instructor', 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'oauthId': '54321', 'name': 'Charlie', 'email': 'charlie@example.com', 'role': 'student', 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'oauthId': '09876', 'name': 'Diana', 'email': 'diana@example.com', 'role': 'student', 'createdAt': new Date(), 'updatedAt': new Date() }
]);

db.getCollection('courses').insertMany([
    { 'courseCode': 'CSE101', 'courseName': 'Introduction to Computer Science', 'description': 'Basics of computer science.', 'credits': 3, 'instructorId': db.getCollection('users').findOne({'role': 'instructor', 'oauthId': '67890'})._id, 'semester': 'Fall 2023', 'prerequisites': [], 'enrolledStudents': [], 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'courseCode': 'CSE201', 'courseName': 'Data Structures', 'description': 'Study of data structures.', 'credits': 4, 'instructorId': db.getCollection('users').findOne({'role': 'instructor', 'oauthId': '67890'})._id, 'semester': 'Fall 2023', 'prerequisites': [], 'enrolledStudents': [], 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'courseCode': 'CSE301', 'courseName': 'Algorithms', 'description': 'Design and analysis of algorithms.', 'credits': 4, 'instructorId': db.getCollection('users').findOne({'role': 'instructor', 'oauthId': '67890'})._id, 'semester': 'Fall 2023', 'prerequisites': [], 'enrolledStudents': [], 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'courseCode': 'CSE401', 'courseName': 'Database Systems', 'description': 'Introduction to database systems.', 'credits': 3, 'instructorId': db.getCollection('users').findOne({'role': 'instructor', 'oauthId': '67890'})._id, 'semester': 'Fall 2023', 'prerequisites': [], 'enrolledStudents': [], 'createdAt': new Date(), 'updatedAt': new Date() }
]);

db.getCollection('assignments').insertMany([
    { 'courseId': db.getCollection('courses').findOne({'courseCode': 'CSE101'})._id, 'title': 'Assignment 1', 'description': 'First assignment description.', 'dueDate': new Date('2023-10-01'), 'maxScore': 100, 'submissions': [{'studentId':db.getCollection('users').findOne({'role': 'student', 'oauthId': '12345'})._id, 'submittedAt': new Date('2023-10-02'), 'score': 100, 'feedback': ''}], 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'courseId': db.getCollection('courses').findOne({'courseCode': 'CSE201'})._id, 'title': 'Assignment 2', 'description': 'Second assignment description.', 'dueDate': new Date('2023-10-15'), 'maxScore': 100, 'submissions': [{'studentId':db.getCollection('users').findOne({'role': 'student', 'oauthId': '54321'})._id, 'submittedAt': new Date('2023-10-16'), 'score': 95, 'feedback': 'Good job'}], 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'courseId': db.getCollection('courses').findOne({'courseCode': 'CSE301'})._id, 'title': 'Assignment 3', 'description': 'Third assignment description.', 'dueDate': new Date('2023-11-01'), 'maxScore': 100, 'submissions': [{'studentId':db.getCollection('users').findOne({'role': 'student', 'oauthId': '09876'})._id, 'submittedAt': new Date('2023-11-02'), 'score': 90, 'feedback': 'Well done'}], 'createdAt': new Date(), 'updatedAt': new Date() },
    { 'courseId': db.getCollection('courses').findOne({'courseCode': 'CSE401'})._id, 'title': 'Assignment 4', 'description': 'Fourth assignment description.', 'dueDate': new Date('2023-11-15'), 'maxScore': 100, 'submissions': [{'studentId':db.getCollection('users').findOne({'role': 'student', 'oauthId': '09876'})._id, 'submittedAt': new Date('2023-11-16'), 'score': 85, 'feedback': 'Needs improvement'}], 'createdAt': new Date(), 'updatedAt': new Date() }
]);
