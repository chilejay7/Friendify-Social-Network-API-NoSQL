const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const morgan = require('morgan');

const PORT = 7075;
const app = express();

// Middleware is defined to handle and parse incoming data requests.
// If we do not include the middleware to parse data, it won't be available in the request.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// This will import the routes from the main index.js file in the root of the routes directory.
app.use(routes);

// This is an event listener for the open event of the database connection.
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`The server is up and listening on ${PORT}`)
    })
});


