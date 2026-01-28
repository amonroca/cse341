const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Student Course Tracker API',
        description: 'This API allows management of users, courses, and assignments in a student course tracking system. It supports CRUD operations, OAuth-based authentication, and provides comprehensive documentation.',
    },
    tags: [
        { name: 'Users', description: 'Operations related to users' },
        { name: 'Courses', description: 'Operations related to courses' },
        { name: 'Assignments', description: 'Operations related to assignments' }
    ],
    host: 'cse341-y63x.onrender.com',
    schemes: ['https'],
    //host: 'localhost:8080',
    //schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./server.js');
});