const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        const users = await User.find();
        res.json(users);
    },
    async getOneUser(req, res) {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if(!user) {
            return res.status(404)
            .json({message: 'A user with that id does not exist.  Please enter another id.'})
        }
        res.json(user);
    },
    async createUser(req, res) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
}