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
  removeMultipleImage
} = require("../controller/productController");

router.route("/getproducts").get(isLoggedIn,getAllProducts);
router.route("/getrecomendeditems").get(isLoggedIn,getRecomendedItems);
router.route("/remove-multiple-image/:id").get(isLoggedIn,removeMultipleImage);
router.route("/getproduct/:id").get(isLoggedIn,getSingleProduct);
router.route("/addproduct").post(isLoggedIn,addProducts);
router.route("/deleteproduct/:id").delete(isLoggedIn,deleteProduct);
router.route("/updateproduct/:id").put(isLoggedIn,updateProduct);

module.exports = router;
