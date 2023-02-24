const mongoose = require('mongoose');
const subcategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "This field is required..."],
        maxLength : [40, "Maximum 40 characters allowed..."]
    },
    category_id : {
        type: mongoose.Schema.ObjectId,
        required : [true, "This field is required..."],
        ref: 'Category'
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})
module.exports = mongoose.model('Subcategory',subcategorySchema)