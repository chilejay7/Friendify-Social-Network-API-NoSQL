const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// This GET route will respond to requests sent to the /api root route.
router.get('/', (req, res) => {
    console.log(`API routes are working`);
    res.status(200).send(`Thanks for visiting the API!`);
})

module.exports = router;