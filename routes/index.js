const express = require('express');
const router = express.Router();

const rssController = require('../controllers/rssController');

router.get('/history', rssController.getHistry);
router.get('/search', rssController.search);

module.exports = router;
