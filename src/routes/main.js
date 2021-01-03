// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Require del control ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search); 

module.exports = router;
