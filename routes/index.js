const router = require('express').Router();

// The route exports from the main index.js file in the api directory are imported.
const apiRoutes = require('./api');

// Defines the route to be used with the apiRoutes.
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    console.log('The routes are working');
    res.status(200).send(`Thanks for visiting!`);
});

router.use((req, res) => {
    res.send('Invalid route');
})

module.exports = router;