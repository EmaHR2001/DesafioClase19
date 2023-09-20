const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: { 
            title: 'Documentación Ecommerce CoderHouse',
            description: "Esta es la descripción que va a figurar en la pagina principal de swagger"
        }
    },
    apis: ['src/docs/**/*.yaml']
};

module.exports = swaggerOptions;