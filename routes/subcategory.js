const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('../middleware/userMiddleware');
const {
    getAllSubcategory,
    getAllSubcategoryByCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory
 } = require('../controller/subcategoryController');

 router.route('/getsubcategory').get(isLoggedIn,getAllSubcategory);
 router.route('/getallsubcategorybycategory/:id').get(isLoggedIn,getAllSubcategoryByCategory);
 router.route('/addsubcategory').post(isLoggedIn,addSubcategory);
 router.route('/updatesubcategory/:id').put(isLoggedIn,updateSubcategory);
 router.route('/deletesubcategory/:id').delete(isLoggedIn,deleteSubcategory);

 module.exports = router;
