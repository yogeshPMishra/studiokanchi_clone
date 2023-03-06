const express = require('express')
const { isLoggedIn, customRole } = require("../middleware/userMiddleware");
const router = express.Router();
const {
    insertShippingDetails,
    getAllShipping,
    getSingleShippingDetails
} =require('../controller/shippingController');

router.route('/addnewshipping').post(isLoggedIn, insertShippingDetails);
router.route('/getallorders').get(isLoggedIn, getAllShipping);
router.route('/getsingleorder/:id').get(isLoggedIn,getSingleShippingDetails);

module.exports = router;