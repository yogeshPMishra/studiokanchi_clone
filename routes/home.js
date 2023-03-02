// home routes 
const express = require('express');
const router = express.Router()
const {home,getNewArrival,getBestSellerProduct} = require('../controller/homeController');

router.route('/').get(home);
router.route('/newarrival').get(getNewArrival)
router.route('/bestsellerproduct').get(getBestSellerProduct)
module.exports = router