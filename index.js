const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const userRoute = require('./routes/userroute');
const taskRoute = require('./routes/taskroute');
const investmentRoute = require('./routes/investmentroute');
const msg = require('./messages');
const app = express();


// Middlewares
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());
app.use(express.json());
app.use(userRoute);
app.use(taskRoute);
app.use(investmentRoute);
// Swagger Documentation

// Serve Swagger UI documentation
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//test Api
app.get('/test', (req, res) => {
    res.send('Test route working!');
});



// Database Connection
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://smsAdmin:sms896152@clustersms.vjntvot.mongodb.net/db_taskinvestmentSystem?retryWrites=true&w=majority&appName=Clustersms');
        console.log(msg.DB_CONNECT);
    } catch (error) {
        throw error;
    }
}

// Start the server
async function startServer() {
    try {
        await connectToDatabase();
        const httpServer = http.createServer(app); // Create regular HTTP server
        httpServer.listen(3000, () => {
            console.log(msg.SERVER_CONNECT);
        });
    } catch (error) {
        process.exit(1); // Exit the process with a non-zero status code
    }
}

startServer();
