const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Synergy API Docs',
      description: 'API Documentations for Synergy',
      version: '1.0.0',
    },
    externalDocs: {
      description: 'OpenAPI Specification',
      url: 'https://swagger.io/specification/',
    },
  },
  apis: ['./src/swagger/**/*.yaml'],
};

export { swaggerConfig };
