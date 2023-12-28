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
];

const users = [];

for (let i = 0; i < usernames.length; i++) {
    users.push({
        username: usernames[i],
        email: `${usernames[i]}@email.com`,
    })
};

module.exports = { users };