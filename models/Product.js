const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required: [true,"please provide product name"],
        trim:true,
        maxlength:[120,"Product name should not be more than 120 characters"]
    },
    category:{
        type: mongoose.Schema.ObjectId,
        required : [true, "This field is required..."],
        ref: 'Category'
    },
    subcategory : {
        type: mongoose.Schema.ObjectId,
        required : [true, "This field is required..."],
        ref: 'Subcategory'
    },
    brand : {
        type: String
    },
    price : {
        type: Number,
    },
    splprice : {
        type: Number,
        required : [true, "This field is required..."],
    },
    quantity : {
        type: String
    },
    status : {
        type: String,
        default : 'active'
    },
    short_description : {
        type: String,
        required : [true, "This field is required..."],
    },
    long_description : {
        type: String,
        required : [true, "This field is required..."],
    },
    attributes : {
        type: mongoose.Schema.ObjectId,
        required : [true, "This field is required..."],
        ref: 'Productattribute'
    },
    ratings:{
        type : Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default:0
    },
    productreview:{
        type: mongoose.Schema.ObjectId,
        required : [true, "This field is required..."],
        ref: 'Productreview'
    },
    photo : {
        id : {
            type : String,
            required:true
        },
        secure_url : {
            type : String,
            required : [true, "Image field is required..."],
        }
    },
    photos:[
        {
            id:{
                type:String,
                required:true
            },
            secure_url:{
                type:String,
                required : [true, "Image field is required..."],
            }
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    },


})

module.exports = mongoose.model('Product',productSchema)