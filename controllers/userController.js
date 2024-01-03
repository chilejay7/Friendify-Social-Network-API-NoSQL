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
    },
    async updateUser(req, res) {
        const { id } = req.params;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!user) {
            return res.status(404)
            .json({message: 'A user with that id does not exist.  Please enter another id.'})
        }

        res.json(user);
    },
    async deleteUser(req, res) {
        const { id } = req.params;
        const user = await User.findOneAndDelete({ _id: id });
        res.json({message: 'User deleted from the database.'});
    },
    async addFriend(req, res) {
        const { id } = req.params;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { $addToSet: { friends: req.body }},
            { runValidators: true, new: true }
        );

        res.json(user);
    },
    async removeFriend(req, res) {
        const { id, friendId } = req.params;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { $pull: { friends: friendId } },
            { runValidators: true, new: true }
        )

        res.json(user)
    }
}