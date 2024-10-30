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
        {
            name: 'Investment-Module',
            description: 'Endpoints related to investment module information',
        }
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
        '/investments': {
            get: {
                summary: 'Get all investments for a user',
                tags: ['Investment-Module'],
                security: [{ Bearer: [] }],
                responses: {
                    200: { description: 'Fetched investments successfully' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/investment/{id}': {
            get: {
                summary: 'Get investment details by ID',
                tags: ['Investment-Module'],
                security: [{ Bearer: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    200: { description: 'Fetched investment successfully' },
                    404: { description: 'Investment not found' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/add-investment': {
            post: {
                summary: 'Add a new investment',
                tags: ['Investment-Module'],
                security: [{ Bearer: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    categoryName: { type: 'string' },
                                    componentName: { type: 'string' },
                                    amount: { type: 'number' },
                                    fyYear: { type: 'number', },
                                },
                                example: {
                                    categoryName: '80C',
                                    componentName: 'LIC',
                                    amount: 490000,
                                    fyYear: 2024,
                                    isActive: true,
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Investment added successfully' },
                    400: { description: 'Missing required fields' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/update-investment/{id}': {
            put: {
                summary: 'Update an existing investment',
                tags: ['Investment-Module'],
                security: [{ Bearer: [] }],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    amount: { type: 'number' },
                                    fyYear: { type: 'number' },
                                },
                                example: {
                                    amount: 600000,
                                    fyYear: 2025,
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Investment updated successfully' },
                    404: { description: 'Investment not found' },
                    500: { description: 'Internal server error' },
                },
            },
        },
        '/delete-investment/{id}': {
            delete: {
                summary: 'Delete an investment by ID',
                tags: ['Investment-Module'],
                security: [{ Bearer: [] }],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    200: { description: 'Investment deleted successfully' },
                    404: { description: 'Investment not found' },
                    500: { description: 'Internal server error' },
                },
            },
        },
    },
};


const outputFile = './swagger-output.json';
const routes = ['./routes/userroute.js', './routes/taskroute.js', './routes/investmentroute.js'];

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
}

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc, options);