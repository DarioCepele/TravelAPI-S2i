// controllers/orderController
const Order = require('../models/order');
const Product = require('../models/product');


exports.createOrder = async (req, res) => {
  try {
    const { productID, userID, productName } = req.body;
    if (productID && userID && productName){
      const order = new Order({ productID, userID, productName });
      await order.save();
      res.status(201).json(order);
    }
    else{
      if(!productID || userID) {
        throw new Error("ProductId and userID not provided");
      } else if (!productID) {
        throw new Error("ProductId  not provided");
      } else {
        throw new Error("userID  not provided");
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.find()
    .populate("userID", "name surname email")
    .populate("productID", "name")
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrdersbyDate = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);

    const orders = await Order.find({
      createdAt: {
        $gte: targetDate,
        $lt: new Date(targetDate.getTime() + 86400000),
      },
    })
      .populate("userID")
      .populate("productID");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve orders." });
  }
};


exports.searchProductByName = async (req, res) => {
  try {
    const { productName } = req.params;
    const orders = await Order.find({
      productID: { $in: await Product.find({ name: { $regex: productName, $options: 'i' } }).select('_id') },
    })
      .populate('userID', 'name surname email')
      .populate('productID', 'name');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Impossibile effettuare la ricerca.' });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Ordine non trovato' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Ordine non trovato' });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Ordine non trovato' });
    }
    res.json({ message: 'Ordine cancellato con successo' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
