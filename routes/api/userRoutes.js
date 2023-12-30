const router = require('express').Router();
const { getUsers, getOneUser } = require('../../controllers/userController');

// This route uses a find query to retrieve all users in the database.
router.route('/').get(getUsers);

// This route uses the _id of a specific document to retrieve one specific user from the database.
router.route('/:id').get(getOneUser);

module.exports = router;