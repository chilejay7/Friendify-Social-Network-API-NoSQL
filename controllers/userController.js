const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ _id: id });
            if (!user) {
                return res.status(404)
                    .json({ message: 'A user with that id does not exist.  Please enter another id.' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
            
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'A user with this id does not exist.  Please select an exisiting user.' });
            };

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOneAndDelete({ _id: id });

            if (!user) {
                return res.status(404).json({ message: 'A user with this id does not exist.  Please select an exisiting user.' })
            }

            res.json({ message: 'User deleted from the database.' });

        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addFriend(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOneAndUpdate(
                { _id: id },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { friends: friendId } },
                { runValidators: true, new: true }
            )

            res.json(user)

        } catch (err) {
            res.status(500).json(err);
        }
    }
}