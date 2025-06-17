const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Life Cost Calculator API',
      version: '1.0.0',
      description: 'REST API документација за Life Cost Calculator',
    },
    servers: [
      { url: 'https://lifecostcalc.onrender.com', description: 'Local server' },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: { type: 'string', example: '6641f2f399eb6a3e7ca091bf' },
            name: { type: 'string', example: 'Testuser' },
            email: { type: 'string', example: 'testuser@email.com' },
            password: { type: 'string', example: '******' },
          },
        },
        Category: {
          type: 'object',
          required: ['name', 'user'],
          properties: {
            _id: { type: 'string', example: '6641f2f399eb6a3e7ca091c9' },
            name: { type: 'string', example: 'Храна' },
            user: { type: 'string', example: '6641f2f399eb6a3e7ca091bf' },
          },
        },
        Cost: {
          type: 'object',
          required: ['amount', 'user', 'category'],
          properties: {
            _id: { type: 'string', example: '6641f2f399eb6a3e7ca09aaa' },
            amount: { type: 'number', example: 1500 },
            description: { type: 'string', example: 'Кирија' },
            user: { type: 'string', example: '6641f2f399eb6a3e7ca091bf' },
            category: { type: 'string', example: '6641f2f399eb6a3e7ca091c9' },
            date: { type: 'string', format: 'date', example: '2024-06-07' },
          },
        },
      },
    },
  },
  apis: [
    './routes/users.js',
    './routes/categories.js',
    './routes/costRoutes.js',
    './routes/db.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
