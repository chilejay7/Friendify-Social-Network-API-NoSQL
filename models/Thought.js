// Imports the schema and model properties from mongoose.
// Schema is used to define the structure of our documents in MongoDB.
// Model is a function within Mongoose that allows us to create a model based on the Schema. Models represent the documents in our MongoDB collection.
const { Schema, model } = require('mongoose');

// The reactionSchema is required for the reactions array defined within the schema.
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
      getters: true,
    },
    id: false,
}
);

// This initializes the Thought model and creates a collection named thoughts using the schema defined.
const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;