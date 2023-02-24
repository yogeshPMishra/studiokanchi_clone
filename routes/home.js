// home routes 
const express = require('express');
const router = express.Router()
const {home,homeDummay} = require('../controller/homeController');

router.route('/').get(home);
router.route('/dummy').get(homeDummay);
module.exports = router