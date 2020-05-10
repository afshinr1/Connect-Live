const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/TopicsPage', require('./topics'));
router.use('/User', require('./users'));
router.use('/Post', require('./posts'));
module.exports = router;