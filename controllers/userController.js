const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        const users = await User.find();
        res.json(users);
    },
}