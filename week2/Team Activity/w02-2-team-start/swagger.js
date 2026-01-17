const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341 TEMPLE API',
        description: 'API documentation for CSE341 course project',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routesFiles = ['./index.js', './routes/temple.js'];

swaggerAutogen(outputFile, routesFiles, doc).then(() => {
    require('./index.js');
});