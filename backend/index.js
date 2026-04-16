const express = require('express');
const app = express();
const bodyparser = require('body-parser'); //body-parse is used to parse the body of the request, means it is used to get the data from the request
const cors = require('cors')
require('dotenv').config();  //Load env variables from the config file
const PORT = process.env.PORT || 8080;
require('./Models/db');
const AuthRouter = require('./Router/AuthRouter') // Importing the router
const ProductRouter = require('./Router/ProductRouter')

app.get("/ping", (req, res) => {
    res.send("pong");
})

//Using the middleware and we are using the JSON Format 
app.use(bodyparser.json())
//CORS --> Cross Origin Resource Sharing, it is used to allow the frontend to access the backend
const allowedOrigins = [
    process.env.FRONTEND_URL,           // Production frontend (e.g. Netlify URL)
    'http://localhost:3000',             // Local development
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
//ROUTER
app.use('/auth', AuthRouter) // Using the router
//Product Router --> 
app.use('/products', ProductRouter)
app.listen(PORT, () => {
    console.log(`Server Online on port ${PORT}`);
})