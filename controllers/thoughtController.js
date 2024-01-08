const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // The find() method returns all documents in a given collection.
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const { id } = req.params;
            const thought = await Thought.findOne({ _id: id });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // This route assumes the request's body will follow the model and include the required fields of thoughtText and a username.
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            res.json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // The _id of the thought a user would like to update will be included in the URL.  The body of the request will contain the fields that need to be updated.
    // The runValidators and new statements run the validations set on the models and return the newly modified object.
    // The default is to return the old object even though it has been modified.  To see updated values we need to use the new: true option.
    async updateThought(req, res) {
        try {
            const { id } = req.params;
            const thought = await Thought.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { runValidators: true, new: true },
            );

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // The id of the specific thought document is destructured from the request's parameters included in the URL.
    async deleteThought(req, res) {
        try {
            const { id } = req.params;
            const thought = await Thought.findOneAndDelete({ _id: id });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id exists.  Please provide a valid thought id.'})
            };

            // This expression uses the $pull operator to remove the thought being deleted from an associated user.
            const user = await User.findOneAndUpdate(
                {thoughts: id },
                { $pull: { thoughts: id } },
                { new: true }
            );

            res.json({ message: 'Thought deleted from the database.' })

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // The request's body should follow the Reaction schema and its defined fields as required.  The request will be sent in JSON format.
    async addThoughtReaction(req, res) {
        try {
            const { id } = req.params;
            const thought = await Thought.findOneAndUpdate(
                { _id: id },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // The id of the thought and the reaction are both destructured from the request's parameters included in the URL.
    // The pull operator is used to remove an object from the nested array using the reactionId parameter.
    async removeReactions(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;
            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId: reactionId } } },
                { runValidators: true, new: true }
            )

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}