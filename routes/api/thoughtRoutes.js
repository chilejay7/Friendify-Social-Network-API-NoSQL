const router = require('express').Router();
const { getThoughts, getOneThought, createThought, updateThought, deleteThought, addThoughtReaction } = require('../../controllers/thoughtController');

// This route uses a find query to retrieve all thoughts in the database.
router.route('/')
.get(getThoughts)
.post(createThought);

// This route uses the _id of a specific document to retrieve one specific thought from the database.
router.route('/:id')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

// This is a separate route for creating reactions on thoughts.
router.route('/:id/reactions').post(addThoughtReaction);

module.exports = router;