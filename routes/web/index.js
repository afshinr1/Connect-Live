const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/TopicsPage', require('./topics'));
router.use('/User', require('./users'));
module.exports = router;