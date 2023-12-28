const connection = require('../config/connection');
const { Reaction, Thought, User } = require('../models');
const { users } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('The database connection is open');

    let userCheck = await connection.db.listCollections({ name: 'user' }).toArray();
    userCheck.length ? await connection.dropCollection('user') : console.log('user collection does not exist');

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    thoughtCheck.length ? await connection.dropCollection('thoughts') : console.log('thoughts collection does not exist');

    await User.collection.insertMany(users);

    console.table(users);

})

