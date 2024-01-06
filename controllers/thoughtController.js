const Thought = require('../models/Thought');

module.exports = {
    async getThoughts(req, res) {
        const thoughts = await Thought.find();
        res.json(thoughts);
    },
    async getOneThought(req, res) {
        const { id } = req.params;
        const thought = await Thought.findOne({ _id: id });
        res.json(thought);
    },
    // This route assumes the request's body will follow the model and include the required fields of thoughtText and a username.
    async createThought(req, res) {
        const newThought = await Thought.create(req.body);
        res.json(newThought);
    },
    // The _id of the thought a user would like to update will be included in the URL.  The body of the request will contain the fields that need to be updated.
    // The runValidators and new statements run the validations set on the models and return the newly modified object.
    // The default is to return the old object even though it has been modified.  To see updated values we need to use the new: true option.
    async updateThought(req, res) {
        const { id } = req.params;
        const thought = await Thought.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { runValidators: true, new: true },
        );

        res.json(thought);
    },
    async deleteThought(req, res) {
        const { id } = req.params;
        const thought = await Thought.findOneAndDelete({ _id: id });
        res.json({ message: 'Thought deleted from the database.'})
    },
    // The request's body should follow the Reaction schema and its defined fields as required.  The request will be sent in JSON format.
    async addThoughtReaction(req, res) {
        const { id } = req.params;
        const thought = await Thought.findOneAndUpdate(
            { _id: id },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        res.json(thought);
    },
    // The 
    async removeReactions(req, res) {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { reactionId: reactionId } } },
            { runValidators: true, new: true }
        )
        
        res.json(thought);
    }
}