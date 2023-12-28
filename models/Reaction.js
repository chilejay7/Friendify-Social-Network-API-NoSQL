const { Schema, Types } = require('mongoose');

// Only the reaction schema is defined.  It is included in the Thought model.
// The schema could also be embedded within the Thought schema and defined within the model itself, but containing it
// in its own module improves modularity and separation of concerns.  This is why an id is not needed for these objects and is set to false.
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
{
    toJSON: {
      getters: true,
    },
    id: false,
}
);

module.exports = reactionSchema;

