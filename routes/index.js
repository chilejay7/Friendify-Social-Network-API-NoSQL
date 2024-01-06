const router = require('express').Router();

// The route exports from the main index.js file in the api directory are imported.
const apiRoutes = require('./api');

// Defines the route to be used with the apiRoutes.
router.use('/api', apiRoutes);

router.use((req, res) => {
    const { status = 500, message = 'Something went wrong' } = err;
    console.log('****************************');
    console.log('**********ERROR*************');
    console.log('****************************');
    res.status(status).send(message);
});

module.exports = router;