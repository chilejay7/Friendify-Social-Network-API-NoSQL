// This creates an array of usernames to be used with the models and schema.
const usernames = [
'code',
'naranja',
'cubby',
'ana',
'bella',
'rooster',
'trash_panda',
'chilejay',
'jaybaby',
'papaJ',
'kat',
'lela',
];

// This array can be used to generate random thoughts.
const thoughtStatements = [
    `I'm not sure I like this.`,
    `Who are you?`,
    `This is neat!`,
    `I can't believe I didn't think of this.`,
    `Thanks for sharing.`,
    `What is this?`,
    `what time does the game start tonight?`,
    `It seems far away.`,
    `Are you sure this is right?`,
];

// This is used to generate random array items for the models and seed data.
const getRandomItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

// The users variable defines an empty array that will hold the user objects to be inserted into the User model.
// This loop creates the usernames and email addresses needed for each user.  The array is exported to the seeds.js file.
const users = [];

for (let i = 0; i < usernames.length; i++) {
    users.push({
        username: usernames[i],
        email: `${usernames[i]}@email.com`,
    })
};

// This function is used to generate random reactions using the thoughtStatements array for reaction statements.
// The function is referenced in the createThoughts function to create the seed data.
const generateReactions = (num) => {
    const reactionData = [];
    for (let i = 0; i < num; i++) {
        reactionData.push({
            reactionBody: getRandomItem(thoughtStatements),
            username: getRandomItem(usernames),
        })
    }
    return reactionData;
}

// This function creates the data needed to seed the thoughts collection.  A number is accepted as an argument in the function and will generate the specified number
// of thoughts as objects with the required fields.
const createThoughts = (num) => {
    let thoughtData = [];
    for (let i = 0; i < num; i++) {
        thoughtData.push({
            thoughtText: getRandomItem(thoughtStatements),
            username: getRandomItem(usernames),
            reactions: [generateReactions(2)],
        })
    }
    return thoughtData;
}

module.exports = { users, getRandomItem, generateReactions };