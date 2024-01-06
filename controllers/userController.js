const User = require('../models/User');

module.exports = {
    // The find() method returns all documents in a given collection.
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
    // This route assumes the request's body will follow the model and include the required fields of a username and email address.
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // The _id of the user to be updated will be included in the request's parameters.  The body of the request will contain the fields that need to be updated.
    // The runValidators and new statements run the validations set on the models and return the newly modified object.
    // The default is to return the old object even though it has been modified.  To see updated values we need to use the new: true option.
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
    // The id of the specific user document is destructured from the request's parameters included in the URL.
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
    // The request's body should include the _id of another user in the database to add to the friends array.  The request will be sent in JSON format.
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
     // The id of the user and the friend are both destructured from the request's parameters included in the URL.
    // The pull operator is used to remove an object from the nested array using the friendId parameter.
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