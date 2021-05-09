const router = require('express').Router();
const verify = require('./verifyToken');

router.post('/add', verify, (req, res) =>{
    res.send('Post routes')
})

module.exports = router;

 