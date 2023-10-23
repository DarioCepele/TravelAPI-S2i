const Product = require('../models/product');

// Crea un nuovo obiettivo
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Ottieni tutti gli obiettivi
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ottieni un obiettivo per ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Obiettivo non trovato' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aggiorna un obiettivo
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Obiettivo non trovato' });
    }
    res.json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Cancella un obiettivo
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Obiettivo non trovato' });
    }
    res.json({ message: 'Obiettivo cancellato con successo' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

