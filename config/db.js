// database connection 
const mongoose = require('mongoose');
const { base } = require('../models/User');
mongoose.set('strictQuery', true);
const connectWithDb = ()=>{
    mongoose.connect(process.env.DB_URL,{
      useNewUrlParser:true,
      useUnifiedTopology: true,
      family:4
    })
    .then(console.log(`DB CONNECTED SUCCESSFULLY`))
    .catch(error => {
        console.log(`FAILED TO CONNECT DB`);
        console.log(error);
        process.exit(1);
    })
}

module.exports = connectWithDb