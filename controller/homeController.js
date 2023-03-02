const Category = require('../models/Category')
const Subcategory = require('../models/Subcategory')
const Product = require('../models/Product')

exports.home = (req, res) => {
  res.status(200).json({
    success: true,
  });
};

exports.getNewArrival = async (req, res, next)=>{
  try {
      const newArrivalProduct = await Product.find({})
          .populate({
              path : 'category',
              model : Category
          })
          .populate({
              path : 'subcategory',
              model : Subcategory
          })
          .limit(3)
      res.status(200).json({ status : 200, 'message' : 'Success', newArrivalProduct });
  } catch (error) {
      res.status(200).json({ error: error.message });
  }
};

exports.getBestSellerProduct = async (req, res, next) =>{
  try {
      const bestSellerProducts = await Product.find({})
          .populate({
              path:'category',
              model : Category
          })
          .populate({
              path:'subcategory',
              model : Subcategory
          })
          .sort({
              _id : -1
          })
          res.status(200).json({ status : 200, 'message' : 'Success', bestSellerProducts });
  } catch (error) {
      res.status(200).json({ error: error.message });
  }
}