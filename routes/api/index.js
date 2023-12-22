const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(`API routes are working`);
})

module.exports = router;