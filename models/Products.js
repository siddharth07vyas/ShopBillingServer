const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    name:{
        type: String
    },
    price:{
        type: String 
    },
    secondayName:{
        type: String
    }
})

module.exports = mongoose.model('Product', ProductSchema);