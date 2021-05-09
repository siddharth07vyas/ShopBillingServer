const mongoose = require('mongoose');


const BillingSchema = mongoose.Schema({
    customerName:{
        type: String
    },
    billingValues:{
        type: String 
    },
    dateTime:{ type : Date, default: Date.now }
})

module.exports = mongoose.model('Billing', BillingSchema);