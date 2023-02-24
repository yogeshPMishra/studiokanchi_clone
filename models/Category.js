const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name :{
         type:String,
         required: [true,"category name required"]
    },
    photo:{
        id:{
            type:String,
            required:true
        },
        secure_url:{
            type:String,
            required:[true,"Image field is required..."]
        }
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Category',categorySchema)