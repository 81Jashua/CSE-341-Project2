const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));
router.use('/pets', require('./pets'));
router.use('/api-docs', require('./docs'));
router.use('/authorization', require('./authorization'));

module.exports = router;