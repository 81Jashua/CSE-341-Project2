const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact Pet API',
    description: 'API for Contacts and their pets',
  },
  host: '',
  schemes: ['http', 'https'],
  securityDefinitions: {
    Authorization: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Authentication token (Bearer)",
      example: "Bearer <your token>",
    },
  },
  security: [
    {
      Authorization: [],
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc); 