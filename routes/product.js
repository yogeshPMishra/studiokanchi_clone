const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('../middleware/userMiddleware');
const {
  getAllProducts,
  addProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getRecomendedItems,
  removeMultipleImage,
  updateAttribute,
  getAttributesByProduct,
  removeAttributeValue,
  removeAttribute,
  getProductsByAttributes
} = require("../controller/productController");

router.route("/getproducts").get(isLoggedIn,getAllProducts);
router.route("/getrecomendeditems").get(isLoggedIn,getRecomendedItems);
router.route("/remove-multiple-image/:id").get(isLoggedIn,removeMultipleImage);
router.route("/getproduct/:id").get(isLoggedIn,getSingleProduct);
router.route("/addproduct").post(isLoggedIn,addProducts);
router.route("/deleteproduct/:id").delete(isLoggedIn,deleteProduct);
router.route("/updateproduct/:id").put(isLoggedIn,updateProduct);

router.route('/update-attribute/:id').post(isLoggedIn, updateAttribute);
router.route('/get-attribute/:id').get(isLoggedIn, getAttributesByProduct);
router.route('/remove-attribute-value/:id').get(isLoggedIn, removeAttributeValue);
router.route('/remove-attribute/:id').get(isLoggedIn, removeAttribute);
router.route('/get-products-by-attribute/:product_id/:attribute_name/:attribute_value').get(getProductsByAttributes);


module.exports = router;
