const express = require("express");
const router = express.Router();

const {
    getAllSubcategory,
    getAllSubcategoryByCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory
 } = require('../controller/subcategoryController');

 router.route('/getsubcategory').get(getAllSubcategory);
 router.route('/getallsubcategorybycategory/:id').get(getAllSubcategoryByCategory);
 router.route('/addsubcategory').post(addSubcategory);
 router.route('/updatesubcategory/:id').put(updateSubcategory);
 router.route('/deletesubcategory/:id').delete(deleteSubcategory);

 module.exports = router;
