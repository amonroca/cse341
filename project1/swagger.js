const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for Contacts management',
    },
    host: 'cse341-y63x.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./server.js');
});