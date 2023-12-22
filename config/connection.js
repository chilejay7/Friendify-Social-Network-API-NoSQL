// The connect and connection properties are destructured from the Mongoose module.
const { connect, connection } = require('mongoose');

// This establishes a connection with the notFacebook database.
// 27017 is the default port for MongoDB.
// A promise callback is used with a catch statement to veify the database has connected without errors.
connect('mongodb://127.0.0.1:27017/notFacebook')
.then(() => {
	console.log(`Database connection open.`)
})
.catch (err => {
	console.log(`The database failed to connect.  The error is: ${err}`)
});

module.exports = connection;