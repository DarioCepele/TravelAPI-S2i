const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product');

const orderSchema = new mongoose.Schema({
    userID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    productID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    }
});

orderSchema.statics.findById = function (userID) {
    return this.findOne({ userID: userID })
}

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
