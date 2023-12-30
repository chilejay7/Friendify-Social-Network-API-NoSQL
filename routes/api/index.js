const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

// This GET route will respond to requests sent to the /api root route.
router.get('/', (req, res) => {
    console.log(`API routes are working`);
    res.status(200).send(`Thanks for visiting the API!`);
})

module.exports = router;