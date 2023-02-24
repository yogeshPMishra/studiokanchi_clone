const Category =  require('../models/Category')
const cloudinary = require('cloudinary').v2;
const CustomError = require('../utils/customError')

// testing complete 
exports.getAllCategory = async (req, res, next) =>{
    try {
        const category = await Category.find({}).sort({_id : -1});
        if(!category){
           return next(new CustomError("Category not found",400))
        }
        res.status(200).json({ category : category});
    } catch (error) {
        return next(new CustomError(error,500))
    }
}

// testing complete 
exports.addCategory = async (req, res, next) =>{
    try {
        const {name} = req.body
        if(!req.files){
            return next(new CustomError("required photo",400))
        }
        const file = req.files.photo;
        const result = await  cloudinary.uploader.upload(file.tempFilePath,{
            folder: 'categories',
            width : 150,
            crop : "scale"
        })
        if(!result){
            return next(new CustomError("failed to upload photo",400))
        }
        const category = await Category.create({
            name,
            photo:{
                id:result.public_id,
                secure_url: result.secure_url
            }
        })
        if(!category){
            return next(new CustomError("Something went wrong while adding category...",400))
        }
        res.status(200).json({
             success : true,
             category
            });
    } catch (error) {
        return next(new CustomError(error,500))
    }
}

// testing complete
exports.updateCategory = async (req, res, next) =>{
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if(!category){
            return next(new CustomError("Invalid Category Id",500))
        }
        let newCategory;
        if(req.files){
             // Deleting the previous image from cloudinary
            await cloudinary.uploader.destroy(category.photo.id);
            const file = req.files.photo;
            const result = await  cloudinary.uploader.upload(file.tempFilePath,{
                folder: 'categories',
                width : 150,
                crop : "scale"
            })
             newCategory = {
                name: req.body.name,
                photo:{
                    id:result.public_id,
                    secure_url:result.secure_url
                }
            }
        }
        else{
             newCategory = {
                name: req.body.name,
                photo:{
                    id:category.photo.id,
                    secure_url:category.photo.secure_url
                }
            }
        }    
    const categoryUpdate = await Category.findByIdAndUpdate(id, newCategory, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    if(!categoryUpdate){
        return next(new CustomError("Failed to update category",500))
    }
    res.status(200).json({
        success : true,
        message : "Category updated Successfully",
        categoryUpdate
       });
    } catch (error) {
        return next(new CustomError(error,500))
    }
}

// testing complete 
exports.deleteCategory = async (req, res, next) =>{
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if(!category){
            return next(new CustomError("Invalid Category Id",500))
        }
        await cloudinary.uploader.destroy(category.photo.id);
        const deletedCategory = await Category.deleteOne(category)
        if(!deletedCategory){
            return next(new CustomError("Failed to delete category",500))
        }
        res.status(200).json({
            success : true,
            message : "Category deleted Successfully"
           });
    } catch (error) {
        return next(new CustomError("Invalid Category Id",500)) 
    }
}
