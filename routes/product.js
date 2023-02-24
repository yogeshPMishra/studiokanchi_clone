const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getRecomendedItems,
} = require("../controller/productController");

router.route("/getproducts").get(getAllProducts);
router.route("/getrecomendeditems").get(getRecomendedItems);
router.route("/getproduct/:id").get(getSingleProduct);
router.route("/addproduct").post(addProducts);
router.route("/deleteproduct/:id").delete(deleteProduct);
router.route("/updateproduct/:id").put(updateProduct);

module.exports = router;
