const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for Contacts management',
    },
    tags: [
        { name: 'Contacts', description: 'Operações de gerenciamento de contatos' }
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