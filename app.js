// import all download aand custom module package here 
const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// cookies and middleware
app.use(cookieparser());

// fileupload middleware
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

// cors middleware
app.use(cors({
    origin : "*"
}));

// morgan middleware 
app.use(morgan(`tiny`));

// regular middleware
app.use(express.json())

// urlencoded middleware
app.use(express.urlencoded({extended:true}))

// import  all router here 
const home = require('./routes/home')
const user = require('./routes/user')
const product = require('./routes/product')
const subcategory = require('./routes/subcategory')
const category = require('./routes/category')
const shipping = require('./routes/shipping');
// router middleware  
app.use('/api/v1',home)
app.use('/api/v1',user) 
app.use('/api/v1/product',product) 
app.use('/api/v1/subcategory',subcategory) 
app.use('/api/v1/category',category) 
app.use('/api/v1/shipping',shipping) 

module.exports = app;