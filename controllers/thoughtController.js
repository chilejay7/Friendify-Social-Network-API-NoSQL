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
}