const express = require('express');
const billingRouter = express.Router();
/*Schema*/
const Billing = require('../models/Billing');


billingRouter.get('/getAll', (req, res) =>{
    Billing.find().then(billingsInfo => {
        res.send(billingsInfo);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving billing info."
        });
    });
})

billingRouter.post('/addBilling', async(req, res)=>{
    console.log(req.body);
    let newBilling = new Billing({
        customerName: req.body.customerName,
        billingValues:req.body.billingInfo,
        //dateTime:res.body.datetime
    })

    try {
        const saveBilling = await newBilling.save();
        res.send(saveBilling);
    } catch (error) {
        res.status(400).send(err);
    }
});

billingRouter.put('/updateBilling/:id', (req, res) =>{
    const updateBilling = {
        billingValues:req.body.billingInfo
    };
    Billing.updateOne({_id: req.params.id}, updateBilling, (err, raw) => {
      if (err) {
        res.send(err);
      }
      res.send(raw);
    });
});

billingRouter.get('/getBillingById/:id', async(req, res) =>{
    const billingInfoExists = await Billing.findById(req.params.id).then(billing => {
        if(!billing) {
            return res.status(404).send({
                message: "Billing Info not found with id " + req.params.id
            });
        }
        res.send(billing);
    }).catch(err => {
        res.status(404).send({
            message: "Billing info not found with id " + req.params.id
        });       
    });

})


module.exports = billingRouter;