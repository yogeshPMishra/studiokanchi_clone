const express = require('express')
const router = express.Router();
const {
    insertShippingDetails,
    getAllShipping,
    getSingleShippingDetails
} =require('../controller/shippingController');

router.route('/addnewshipping').post( insertShippingDetails);
router.route('/getallorders').get( getAllShipping);
router.route('/getsingleorder/:id').get(getSingleShippingDetails);

module.exports = router;