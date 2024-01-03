const router = require('express').Router();
const { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController');

// This route uses a find query to retrieve all users in the database.
router.route('/')
.get(getUsers)
.post(createUser);

// This route uses the _id of a specific document to retrieve one specific user from the database.
router.route('/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

// This route will allow a friend to be added to a specific user's document.
router.route('/:id/friends')
.post(addFriend)

// This route was added to remove friends from a user's friends list arrray.
router.route('/:userId/friends/:friendId')
.delete(removeFriend);

module.exports = router;