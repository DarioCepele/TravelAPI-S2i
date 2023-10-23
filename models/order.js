const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID:
        { 
            type: [mongoose.Schema.Types.ObjectId], 
            ref: 'User',
            required: true
        },
    productID:
        { 
            type: [mongoose.Schema.Types.ObjectId], 
            ref: 'Product',
            required: true
        },
    productName: 
        {
            type: String, 
            required: true
        }
},
    { timestamps: true }
);

orderSchema.statics.findById = function (userID) {
    return this.findOne({ userID: userID })
}

orderSchema.statics.findByIdAndDate = function (userId, targetDate) {
    return this.findOne({
      userID: userId,
      createdAt: {
        $gte: targetDate,
        $lt: new Date(targetDate.getTime() + 86400000), 
      },
    });
  };

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
