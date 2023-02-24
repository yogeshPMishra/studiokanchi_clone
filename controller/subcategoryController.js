const Subcategory = require('../models/Subcategory');
const Category  = require('../models/Category')
const CustomError = require('../utils/customError')

exports.getAllSubcategory = async (req,res,next) =>{
    try {
        const subcategory = await Subcategory.aggregate([
            {
              $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "joinedvalue",
              },
            },
          ]).sort({"_id":-1});

        if(subcategory.length == []){
          res.status(400).json({message : "No Sub Categories Available Now..."});
          return;
        }     
        res.status(200).json({
            success:true,
            subcategory
        })
    } catch (error) {
        return next(new CustomError(error,500))
    }
}

exports.getAllSubcategoryByCategory = async(req,res,next) =>{
    try {
        const id = req.params.id;
        const subcategoryListByCategory =  await Subcategory.aggregate({
            $lookup:{
                from: "categories",
                localField:"category_id",
                foreignField:id,
                as:"category"
            }
        })
        if(!subcategoryListByCategory){
            return next(new CustomError("No such data found",400))
        }
        res.status(200).json({
            success:true,
            subcategoryListByCategory
        })
        
    } catch (error) {
        return next(new CustomError(error,500))
    }
}

exports.addSubcategory = async (req,res,next) =>{
    try {
        const {name,category_id} = req.body;
        if(!name || !category_id){
            return next(new CustomError("both field must be required",400))
        }
        const subcategory = await Subcategory.create({
            name,
            category_id
        });
        if(!subcategory){
           return next(new CustomError("Something wents to wrong!",400))
        }
        res.status(200).json({
            success:true,
            subcategory
        })
    } catch (error) {
        return next(new CustomError(error,500))
    }
}

exports.updateSubcategory = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const subcategory = await Subcategory.findById(id);
        if(!subcategory){
            return next(new CustomError("subcategory not found",400))
        }
        const {name,category_id}= req.body
        const newData = {
            name:name,
            category_id:category_id
        }
        if(name == subcategory.name && category_id == subcategory.category_id){
             res.status(200).json({
                subcategory
             })
        }

        const subcategoryUpdate = await Subcategory.findByIdAndUpdate(id, newData, {
            new : true,
            runValidators : true,
            useFindAndModify : false
        })
        if(!subcategoryUpdate){
            return next(new CustomError("failed to update subcategory",400))
        }
        res.status(200).json({
            success : true,
            subcategoryUpdate
         })  
    } catch (error) {
        return next(new CustomError(error,500))
    }
}

exports.deleteSubcategory = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const subcategory = await Subcategory.findById(id);
        if(!subcategory){
            return next(new CustomError("subcategory not found",400))
        }
        const deleteSubcategory = await Subcategory.deleteOne(subcategory);
        if(!deleteSubcategory){
            return next(new CustomError("failed to delete subcategory",400))
        }
        res.status(200).json({
            success : true,
            message: "Subcategory deleted successfully"
        })
    } catch (error) {
        return next(new CustomError(error,500))
    }
}

