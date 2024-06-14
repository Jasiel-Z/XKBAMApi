const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'XKBAM Backend for Node.js Api',
        description: 'Esta es la api de XKBAM creada por el equipo de desarrollo CoquetteBoys'

    },
    host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile,routes,doc);

