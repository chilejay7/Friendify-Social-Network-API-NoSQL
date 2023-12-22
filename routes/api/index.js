const router = require('express').Router();

// This GET route will respond to requests sent to the /api root route.
router.get('/', (req, res) => {
    console.log(`API routes are working`);
})

module.exports = router;