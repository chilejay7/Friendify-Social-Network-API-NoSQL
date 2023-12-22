const router = require('express').Router();

// The route exports from the main index.js file in the api directory are imported.
const apiRoutes = require('./api');

// Defines the route to be used with the apiRoutes.
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    console.log('The routes are working');
    // res.send(`Thanks for visiting`);
})

module.exports = router;