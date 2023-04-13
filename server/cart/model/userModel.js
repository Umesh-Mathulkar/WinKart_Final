const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    
    email:String,
    orderId:Number
});

mongoose.model('cart',userSchema);
module.exports = mongoose.model('cart');