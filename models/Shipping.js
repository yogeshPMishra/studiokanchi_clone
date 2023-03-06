const mongoose = require("mongoose");
const shippingSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required: true
    },
    lastname :{
        type : String,
        required: true
    },
    street_address:{
        type:String,
        required: true
    },
    city:{
        type : String,
        required: true
    },
    state : {
        type : String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone:{
        type : String,
        required: true
    },
    orderDetails:{
         counter : Number,
         orderId : String  
    },
    feedback :{
       type :String,
    },
    product_details :[
            {
                product_id :{
                    type :mongoose.Types.ObjectId,
                    ref:'products',
                },
                productname : {
                    type :String
                },
                price : {
                    type : String
                },
                quantity : {
                    type : String
                }   
            }
    ],
    total_price:{
        type : String
    }
}) 

module.exports = mongoose.model("Shipping",shippingSchema)