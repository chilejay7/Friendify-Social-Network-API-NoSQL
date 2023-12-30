const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        const users = await User.find();
        res.json(users);
    },
    async getOneUser(req, res) {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        res.json(user);
    }
}