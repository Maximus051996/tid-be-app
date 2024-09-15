const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'Task Investment API',
        description: 'Task Investment Documentation V1.0.0',
    },
    host: 'localhost:3000',
    tags: [
        {
            name: 'User-Module',
            description: 'Endpoints related to user modules information',
        },
        {
            name: 'Task-Module',
            description: 'Endpoints related to task modules information',
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
        '/register-user': {
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
        "/get-user-details/{id}": {
            "get": {
                "summary": "Retrieve a user by ID",
                "tags": ["User-Module"],
                "security": [{ "Bearer": [] }],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": { "description": "User retrieved successfully" },
                    "404": { "description": "User not found" },
                    "500": { "description": "Internal server error" }
                }
            }
        },
        '/tasks': {
            get: {
                summary: 'Get all tasks',
                tags: ['Task-Module'],
                security: [{ Bearer: [] }], // Requires Bearer token
                responses: {
                    200: { description: 'Fetched successfully' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/add-task': {
            post: {
                summary: 'Add task details',
                tags: ['Task-Module'],
                security: [{ Bearer: [] }], // Requires Bearer token
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    subject: { type: 'string' },
                                    description: { type: 'string' },
                                    priority: { type: 'string' },
                                    startDate: { type: 'string', format: 'date-time' },
                                    endDate: { type: 'string', format: 'date-time' },
                                    isRemainder: { type: 'boolean' },
                                    subtasks: { type: "array", items: { type: "string" } } // Added subtasks here
                                },
                                example: {
                                    subject: 'New Task',
                                    description: 'Description of the task',
                                    priority: 'High',
                                    startDate: '2024-08-24T14:00:00Z',
                                    endDate: '2024-08-25T14:00:00Z',
                                    isRemainder: true,
                                    subtasks: ['Subtask 1', 'Subtask 2'],
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Added successfully' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/update-task/{id}': {
            put: {
                summary: 'Update task details',
                tags: ['Task-Module'],
                security: [{ Bearer: [] }], // Requires Bearer token
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    description: { type: 'string' },
                                    priority: { type: 'string' },
                                    endDate: { type: 'string', format: 'date-time' },
                                    isRemainder: { type: 'boolean' },
                                    isCompleted: { type: 'boolean' },
                                    subtasks: { type: "array", items: { type: "string" } }
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Updated successfully' },
                    404: { description: 'Record not found' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/delete-task/{id}': {
            delete: {
                summary: 'Delete task details',
                tags: ['Task-Module'],
                security: [{ Bearer: [] }], // Requires Bearer token
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: { description: 'Deleted successfully' },
                    404: { description: 'Record not found' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/task/{id}': {
            get: {
                summary: 'Get task details by ID',
                tags: ['Task-Module'],
                security: [{ Bearer: [] }], // Requires Bearer token
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: { description: 'Fetched successfully' },
                    404: { description: 'Record not found' },
                    500: { description: 'Internal server error' },
                },
            },
        },
    },
};


const outputFile = './swagger-output.json';
const routes = ['./routes/userroute.js', './routes/taskroute.js'];

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
}

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc, options);