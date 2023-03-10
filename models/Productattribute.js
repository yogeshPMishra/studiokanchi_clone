const mongoose = require('mongoose')

const productattributeSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.ObjectId,
        required:[true,"Product id is required"],
        ref:'Product'
    },
    attribute_name:{
        type:String,
        required:[true,"Attribute Name  is required"],
    },
    attribute_value : {
        type : String,
        required : [true, "This field is required..."],
        maxLength : [40, "Maximum 40 characters allowed..."]
    },
    photos : [
        {
            id : {
                type : String,
            },
            secure_url : {
                type : String
            },
            original_image : {
                type : Object
            }
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now()
    }
})
module.exports = mongoose.model("Productattribute",productattributeSchema)