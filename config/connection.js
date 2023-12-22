const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/socialMedia')
.then(() => {
	console.log(`Database connection open`)
})
.catch (err => {
	console.log(`The database failed to connect.  The error is: ${err}`)
});

module.exports = connection;