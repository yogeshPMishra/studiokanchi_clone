// import all download package here 
const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//temp check
app.set('view engine',"ejs")

// cookies and middleware

app.use(cookieparser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

// morgan middleware 
app.use(morgan(`tiny`));

// regular middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// import  all router here 
const home = require('./routes/home')
const user = require('./routes/user')
const product = require('./routes/product')
const subcategory = require('./routes/subcategory')
const category = require('./routes/category')

// router middleware  
app.use('/api/v1',home)
app.use('/api/v1',user) 
app.use('/api/v1/product',product) 
app.use('/api/v1/subcategory',subcategory) 
app.use('/api/v1/category',category) 


// demo ejs register routes 
app.get('/signuptext',(req,res)=>{
    res.render('register');
})

module.exports = app;