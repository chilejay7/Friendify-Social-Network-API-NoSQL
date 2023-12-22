const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 7075;
const app = express();

// Middleware is defined to handle and parse incoming data requests.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// This is an event listener for the open event of the database connection.
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`The server is up and listening on ${PORT}`)
    })
});


