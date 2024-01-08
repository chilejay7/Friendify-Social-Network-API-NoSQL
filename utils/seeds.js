const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { users, createThoughts } = require('./data');

// An event listener is set on the database connection to log any connection errors that may occur.
connection.on('error', (err) => console.error(`***Connection error encountered: ${err}***`));

connection.once('open', async () => {
    console.log('The database connection is open');

    // The code that follows will check to see if the colletions specified already exist.  If they do, they will be dropped.  There is a check for both user and thoughts.
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    userCheck.length ? await connection.dropCollection('users') : console.log('user collection does not exist');

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    thoughtCheck.length ? await connection.dropCollection('thoughts') : console.log('thoughts collection does not exist');

    // The seed data for the User model uses an insertMany statement to create documents for each user from the array defined in the data.js file.
    // This is an array of objects that includes a username and email that are dynamically generated.
    await User.collection.insertMany(users);

    // Thoughts are created using the function defined in the data.js file.  Any number can be passed to the funciton as an argument to provide the number of thoughts required.
    // A for loop uses the argument given to create the specified number of thoughts.
    const newThoughts = createThoughts(10);

    // After the thoughts are created, an insertMany statement is used to create documents using the newThoughts variable.
    await Thought.collection.insertMany(newThoughts);

    // Console.table statements are used to verify the results of the seed data have been written to the database correctly.
    console.table(users);
    console.table(newThoughts);
})

