const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'Task Investment API',
        description: 'Task Investment Documentation V1.0.0',
    },
    host: ['localhost:3000', 'tid-be-app.vercel.app'],
    tags: [
        {
            name: 'User-Module',
            description: 'Endpoints related to user modules information',
        },
    ],
    paths: {
        '/login': {
            post: {
                summary: 'Login as a user',
                tags: ['User-Module'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userName: { type: 'string' },
                                    userPassword: { type: 'string' },
                                },
                                example: {
                                    userName: 'exampleUser',
                                    userPassword: 'examplePassword123',
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'User logged in successfully' },
                    401: { description: 'Invalid credentials' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/add-user': {
            post: {
                summary: 'Register a new user',
                tags: ['User-Module'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userName: { type: 'string' },
                                    userEmail: { type: 'string' },
                                    phone: { type: 'string' },
                                    userPassword: { type: 'string' },
                                },
                                example: {
                                    userName: 'newUser',
                                    userEmail: 'newuser@example.com',
                                    phone: 'newUserPassword123',
                                    userPassword: '1234 Example St, Example City, EX 12345',
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'User registered successfully' },
                    400: { description: 'Username already exists' },
                    500: { description: 'Internal server error' },
                },
            },
        },
    },
};


const outputFile = './swagger-output.json';
const routes = ['./routes/userroute.js'];

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
}

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc, options);