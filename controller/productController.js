const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Productreview = require('../models/Productreview');
const cloudinary = require("cloudinary").v2;
const CustomError = require("../utils/customError");

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
      },
      {
        $unwind: "$joinedsubcategoryvalue",
      },
      {
        $lookup: {
          from: "productattributes",
          localField: "attributes",
          foreignField: "_id",
          as: "joinedproductattributesvalue",
        },
      },
      {
        $unwind: "$joinedproductattributesvalue",
      },
      {
        $lookup: {
          from: "productreviews",
          localField: "productreview",
          foreignField: "_id",
          as: "joinedproducteviewsvalue",
        },
      },
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

exports.addProducts = async (req, res, next) => {
  try {
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
      attributes,
      productreview,
    } = req.body;

    if(!(name && category && subcategory && brand && price && splprice && quantity && status && short_description && long_description && attributes && productreview)){
       res.status(400).json({
        message : "All field most be required",
       })
    }
    if(!req.files.photo){
      res.status(400).json({
        message : "Photo field most be required",
       })
    }
    if(!req.files.photos){
      res.status(400).json({
        message : "Photos field most be required",
      })
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
          secure_id: result.secure_url
      }
      photos.push(image);
    }
    let ratings;
    let numofreviews;

    if( await Productreview.find() == []){
      ratings = 0;
      numofreviews = 0;
    }
    else{
     const ratingarr = await Productreview.find({rating:1,_id:0})
     const numberofreviews = await Productreview.find();
     let allrating = 0;
     for(ratingarr of i){
          allrating =+ i.rating;


     }
        ratings = allrating/ratingarr.length;
        numofreviews = numberofreviews.length
    }
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
      attributes,
      ratings:ratings,
      numberOfReviews:numofreviews,
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

exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
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
      ratings:product.ratings,
      numberOfReviews:product.numberOfReviews
    };

  

    if (!product) {
      res.json({ error: "Product Id is not valid..." });
      return;
    }

    if (req.files) {
      if (req.files.photo) {
        // Deleting the previous image from cloudinary
        cloudinary.uploader.destroy(Product.photo.id);
        // Inserting new data to cloudinary
        result = await cloudinary.uploader.upload(req.files.photo.tempFilePath, {
          folder: "products",
        });

        newData.photo = {
          id: result.public_id,
          secure_url: result.secure_url,
        };
      } else {
        newData.photo = {
          id: Product.photo.id,
          secure_url: Product.photo.secure_url,
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

        let photos = [];
        let existingPhotos = Product.photos;
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

