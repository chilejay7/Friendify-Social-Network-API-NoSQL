const router = require('express').Router();
const { getThoughts, getOneThought } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts);
router.route('/:id').get(getOneThought);

module.exports = router;