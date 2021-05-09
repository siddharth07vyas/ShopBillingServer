const express = require('express');
const productRouter = express.Router();
var cors = require('cors')

/*Schema*/
const Product = require('../models/Products');

productRouter.post('/addProduct', async(req,res) =>{
    const nameExist = await Product.findOne({
        name: req.body.name
    });
    if(nameExist) return res.status(400).send('Name already exists');

    let newProduct = new Product({
        name: req.body.name,
        price:req.body.price,
        secondayName: req.body.secondayName
    });

    try{
        const saveProduct = await newProduct.save();
        res.send(saveProduct);

    }catch(err){
        res.status(400).send(err);
    }
});

productRouter.put('/updateProduct/:id', (req, res) =>{
    
      const updateProduct = {
        name: req.body.name,
        price:req.body.price,
        secondayName: req.body.secondayName
      };
      Product.updateOne({_id: req.params.id}, updateProduct, (err, raw) => {
        if (err) {
          res.send(err);
        }
        res.send(raw);
      });
});

productRouter.get('/getAll', (req, res) =>{
    Product.find().then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
})

productRouter.delete('/deleteProduct/:id', (req, res) =>{
    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Product with id " + req.params.id
        });
    });
})

productRouter.get('/getProductById/:id', async(req, res) =>{
    const productExists = await Product.findById(req.params.id).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send(product);
    }).catch(err => {
        res.status(404).send({
            message: "Product not found with id " + req.params.id
        });       
    });

})

module.exports = productRouter;