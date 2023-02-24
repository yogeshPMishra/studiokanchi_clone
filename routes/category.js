const express = require("express");
const router = express.Router();

const {
    getAllCategory,
    addCategory,
    updateCategory,
    deleteCategory
 } = require('../controller/categoryController');

 router.route('/getcategory').get(getAllCategory);
 router.route('/addcategory').post(addCategory);
 router.route('/updatecategory/:id').put(updateCategory);
 router.route('/deletecategory/:id').delete(deleteCategory);

 module.exports = router;