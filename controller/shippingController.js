const Shipping = require('../models/Shipping');

exports.insertShippingDetails = async (req,res,next) =>{
    try {
        const {
            firstname,
            lastname,
            street_address,
            city,
            state,
            zip,
            phone,
            feedback,
            productDetails,
            total_price,
        } = req.body
       
        let productDetailsarr = [];
        let newShipping;
        productDetails.forEach(element => {
            let product = {
             product_id : element._id,
             productname : element.name,
             price : element.splprice,
             quantity : element.quantity
            }
         productDetailsarr.push(product);
    });
    if(!( firstname || lastname ||street_address || city || state || zip || phone ||total_price)){
        res.status(400).json({
            message : "All fields are required !!!"
        })
        return;
    }
    let orderformat = "SDKN000";
    let orderDetails;
    const Shippingdetails = await Shipping.find();
    if(Shippingdetails.length == 0){  
        let counter = 1;
        let orderId = orderformat.concat(counter);
        orderDetails = {
            counter : counter,
            orderId : orderId
        } 
    }
    else{
        const Shippingdetails = await Shipping.find().sort({_id:-1}).limit(1);
            let counter =  Shippingdetails[0].orderDetails.counter;
            let  newcounter = parseInt(counter);
            newcounter++;
            let orderId = orderformat.concat(newcounter);
            orderDetails = {
                counter : newcounter,
                orderId : orderId
            }
    }
    console.log(orderDetails);
    newShipping = await Shipping.create({
        firstname,
        lastname,
        street_address,
        city,
        state,
        zip,
        phone,
        feedback,
        orderDetails: orderDetails,
        product_details: productDetailsarr,
        total_price
    })
    if(!newShipping){
        res.status(400).json({
            message : "Failed to Shipping Orders !!!"
        })
        return;
    }
    res.status(200).json({
        success :true,
        newShipping
    })
    } catch (error) {
        res.status(400).json({
            message : error
        })
    }
}

exports.getAllShipping = async (req,res,next) =>{
    try {
        const ShippingDetails = await Shipping.find();
        if(!ShippingDetails){
            res.status(400).json({
                  message : "Shipping Details Not Found !"
            })
            return;
        }
        res.status(201).json({
            ShippingDetails : ShippingDetails
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

exports.getSingleShippingDetails = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const ShippingDetails = await Shipping.find({_id:id});
        if(!ShippingDetails){
            res.status(400).json({
                  message : "Shipping Details Not Found !"
            })
            return;
        }
        res.status(201).json({
            ShippingDetails : ShippingDetails
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}