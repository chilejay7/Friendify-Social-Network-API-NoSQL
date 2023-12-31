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
    async createThought(req, res) {
        const newThought = await Thought.create(req.body);
        res.json(newThought);
    },
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
    }
}