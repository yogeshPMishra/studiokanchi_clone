const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const cloudinary = require("cloudinary").v2;
const CustomError = require("../utils/customError");
const Productattribute = require('../models/Productattribute');

// testing complete 
exports.getAllProducts = async (req, res, next) => {
  try {
    const getAllproducts = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "joinedvalue",
        },
      },
      {
        $unwind: "$joinedvalue",
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "joinedsubcategoryvalue",
        },
      }
    ]).sort({ _id: -1 });
    if (getAllproducts.length == 0) {
      res.status(200).json({
        message: "Product Not Found",
      });
      return;
    }
    res.status(200).json({
      Products: getAllproducts,
    });
  } catch (error) {
    return next(new CustomError(error, 500));
  }
};

// testing complete
exports.addProducts = async (req, res, next) => {
  try {
    if (!req.files) {
      res.status(200).json({ error: "File is Missing..." });
      return;
    }
    const {
      name,
      category,
      subcategory,
      brand,
      price,
      splprice,
      quantity,
      status,
      short_description,
      long_description,
    } = req.body;

    if(!(name && category && subcategory && brand && price && splprice && quantity && short_description && long_description)){
       res.status(400).json({
        message : "All field most be required",
       })
    } 
    if(!req.files.photo){
      res.status(400).json({
        message : "Photo field most be required",
       })
       return
    }
    if(!req.files.photos){
      res.status(400).json({
        message : "Photos field most be required",
      })
      return
    }
    const uploadphoto = await cloudinary.uploader.upload(req.files.photo.tempFilePath,{
      folder: "products",
    })
    let photos = [];
    let multipleimage = [];
      if (req.files.photos.name != undefined) {
        multipleimage.push(req.files.photos);
      } else {
        multipleimage = req.files.photos;
      }
      for(let index = 0;index < multipleimage.length;index++){
        const file = multipleimage[index];
        console.log(file);
      // Saving the files in the cloudinary
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "product_gallery",
      });
      let image = {
          id:result.public_id,
          secure_url: result.secure_url
      }
      photos.push(image);
    }
    console.log(photos);
    const product = await Product.create({
      name,
      category,
      subcategory,
      brand,
      price,
      splprice,
      quantity,
      status,
      short_description,
      long_description,
      photo:{
        id:uploadphoto.public_id,
        secure_url : uploadphoto.secure_url
      },
      photos: photos
    })
    if(!product){
      return next(new CustomError("failed to add product", 400));
    }
    res.status(200).json({
      success: true,
      product
    })
    } catch (error) {
    return next(new CustomError(error, 500));
  }
};

// testing complete 
exports.deleteProduct = async (req,res,next) =>{
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      res.json({ error: "No Product Found On This ID..." });
      return;
    }
    cloudinary.uploader.destroy(product.photo.id);
    const deletProduct = await product.remove();

    if (!deletProduct) {
      res.json({
        error: "Something went wrong while deleting the product...",
      });
      return;
    }

    res.json({ success: true, message: "Product Deleted..." });
  } catch (err) {
    res.json(err.message);
  }
}

// testing complete 
exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.params.id);
    if(!id){
      res.json({ error: " Id is not valid..." });
      return;
    }
    const product = await Product.findById(id);
    const newData = {
      name: req.body.name,
      category: req.body.category,
      subcategory: req.body.subcategory,
      brand: req.body.brand,
      price: req.body.price,
      splprice: req.body.splprice,
      quantity: req.body.quantity,
      status: req.body.status,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
    };

    if (!product) {
      res.json({ error: "Product Id is not valid..." });
      return;
    }

    if (req.files) {
      if (req.files.photo) {
        // Deleting the previous image from cloudinary
        cloudinary.uploader.destroy(product.photo.id);
        // Inserting new data to cloudinary
        result = await cloudinary.uploader.upload(req.files.photo.tempFilePath, {
          folder: "products",
        });

        newData.photo = {
          id: result.public_id,
          secure_url: result.secure_url,
        };
      } 
      else {
        newData.photo = {
          id: product.photo.id,
          secure_url: product.photo.secure_url,
        };
      }

      // Uploading multiple file

      if (req.files.photos) {
        let multipleimage = [];
        if (req.files.photos.name != undefined) {
          multipleimage.push(req.files.photos);
        } else {
          multipleimage = req.files.photos;
        }

        // let photos = [];
        let existingPhotos = product.photos;
        for (let index = 0; index < multipleimage.length; index++) {
          let result;
          const file = multipleimage[index];
          // Saving the files in the cloudinary
          result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "product_gallery",
          });
          let image = {
            id: result.public_id,
            secure_url: result.secure_url,
          };
          existingPhotos.push(image);
          newData.photos = existingPhotos;
        }
      }

    }

    const productUpdate = await Product.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!productUpdate) {
      res.json({ error: "Something went wrong while updating Data..." });
    } else {
      res.status(200).json({ product:product });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

// testing complete 
exports.getSingleProduct = async (req,res,next) =>{
    try {
      const id = req.params.id;
      const product = await Product.findById(id).populate({
        path: "category",
        model: Category,
      }).populate({
        path:"subcategory",
        model:Subcategory
      }).sort({_id: -1});
      if(!product){
        res.status(200).json({message:'Product not found'})
      }
      res.status(200).json({success:true,product:product})
    } catch (error) {
      res.status(500).json({success:false,message:"Something went to wrong"});
    }

};

// testing complete 
exports.getRecomendedItems = async (req,res,next) =>{
  try {
      const products = await Product.find({}).limit(12).sort({_id:-1})
      if(!products){
        res.status(200).json({ message: "product not found" });
      }
      res.status(200).json({ products: products });
  } catch (error) {
     res.status(400).json({
       message : error
     })
  }
}

// testing complete
exports.removeMultipleImage = async (req, res, next) => {
  try {
    var queryobj = require("url").parse(req.url, true).query;
    const id = queryobj.product_id;
    let image_id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      res.json({ error: "No Product Found On This ID..." });
      return;
    }
    for (let index = 0; index < product.photos.length; index++) {
      if (image_id == product.photos[index]._id) {
        // Deleting the previous image from cloudinary
        cloudinary.uploader.destroy(product.photos[index].id);

        // Saving the product after deleting the image
        product.photos.splice(index, 1);
      }
    }
    await product.save({ validateBeforeSave: false });
    res.status(200).json({message : "Photo remove successfully !"})
  }
  catch(error){
    res.status(500).json({message : error})
  }
}


