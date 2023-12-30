const router = require('express').Router();
const { getThoughts, getOneThought } = require('../../controllers/thoughtController');

// This route uses a find query to retrieve all thoughts in the database.
router.route('/').get(getThoughts);

// This route uses the _id of a specific document to retrieve one specific thought from the database.
router.route('/:id').get(getOneThought);

module.exports = router;