const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');
require('dotenv/config');




mongoose.connect(process.env.DB_CONNECTION,config.connectionParams);

mongoose.connection.on('connected', () =>{
    console.log('connected')
});

mongoose.connection.on('error', (err) =>{
    console.log('database error' + err )
});

const app = express();

/*CORS Enable*/
app.use(cors());
app.options('*', cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const users = require('./routes/users');


//Import Routes
//const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const billingRoutes = require('./routes/billing');

//Routes Middleware
//app.use('/api/user',authRoutes);
app.use('/product', productRoutes);
app.use('/billing', billingRoutes);


const port = 3000;




app.listen(port, () =>{
console.log('server started')

})