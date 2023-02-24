const mongoose = require('mongoose')

const productReviewSchema = new mongoose.Schema({
    user_id :{
        type:mongoose.Schema.ObjectId,
        required:[true,"User Id is Required"],
        ref:"User"
    },
    name: {
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Productreview',productReviewSchema)