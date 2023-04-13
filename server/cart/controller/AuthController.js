const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config');
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//all users
router.get('/cart', (req, res) => {
    User.find({}, (err, data) => {
        if (err) throw err
        res.send(data);

    })
});

//register
router.post('/cartPost', (req, res) => {

    User.create({

        email: req.body.email,
        orderId: req.body.orderId
    }, (err, result) => {
        if (err) res.send("unable to add to cart")
        res.send("added successfully")
    })
});

//login
router.delete('/deleteCart/:oid',(req,res)=>{
    let oid = Number(req.params.oid);
    User.remove({
        // email:"nikki@gmail.com",
        orderId:oid},
        (err,result)=>{
        if(err) res.send("unable to delete")
        res.send() // replace "orderId" with "oid"
    })
})

// router.post('/login',(req,res)=>{
//     User.findOne({email:req.body.email},(err,user)=>{
//         if(err) return res.send({auth:false,token:"error while logging in"})
//         if(!user) return res.send({auth:false,token:"no user found"})
//         else{
//             let validPass = bcrypt.compareSync(req.body.password,user.password);
//             if(!validPass) res.send({auth:false,token:"wrong password"})
//             let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400});
//             res.send({auth:true,token:token})
//         }
//     })
// })


//userinfo

router.get('/cartUser/:email', (req, res) => {
    let email = req.params.email
    let query = { email: email }
    User.find(query).exec((err, result) => {
        if (err) throw err;
        res.send(result);
    })
})





module.exports = router;