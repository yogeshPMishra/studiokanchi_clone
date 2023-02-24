const express = require('express');
const router = express.Router()
const {getAllProducts,addProducts,deleteProduct,updateProduct} = require('../controller/productController');

router.route('/getproducts').get(getAllProducts);
router.route('/addproduct').post(addProducts);
router.route('/deleteProduct/:id').delete(deleteProduct);
router.route('/updateProduct/:id').put(updateProduct);

module.exports = router