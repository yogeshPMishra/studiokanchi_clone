const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('../middleware/userMiddleware');
const {
    getAllCategory,
    addCategory,
    updateCategory,
    deleteCategory
 } = require('../controller/categoryController');

 router.route('/getcategory').get(isLoggedIn,getAllCategory);
 router.route('/addcategory').post(isLoggedIn,addCategory);
 router.route('/updatecategory/:id').put(isLoggedIn,updateCategory);
 router.route('/deletecategory/:id').delete(isLoggedIn,deleteCategory);

 module.exports = router;