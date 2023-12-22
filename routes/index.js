const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('The routes are working');
    res.send(`Thanks for visiting`);
})

module.exports = router;