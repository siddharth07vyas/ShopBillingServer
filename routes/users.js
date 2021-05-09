const express = require('express');
const router  = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/Users');


router.post('/register', async(req, res) =>{
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasnPass = await bcrypt.hash(res.body.password, salt);


    let newUser = new User({
        name: req.body.name,
        email:req.body.email,
        password: hasnPass
    });

    try{
        const saveUser = await newUser.save();
        res.send(saveUser);

    }catch(err){
        res.status(400).send(err);
    }
    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg:'failed to register'});
        }else{
            res.json({success: true, msg:'users register'})
        }
    })
});

router.post('/login', async(req, res) =>{
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //Create token
    const token  = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);



})

module.exports = router;