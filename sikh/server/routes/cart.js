const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

router.get('/', auth, async (req, res) => {
  const items = await CartItem.find({ user: req.user._id }).populate('product');
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const { productId, qty = 1, size } = req.body;
  const existing = await CartItem.findOne({ user: req.user._id, product: productId, size });
  if (existing) {
    existing.qty += qty;
    await existing.save();
    return res.json(existing);
  }
  const item = await CartItem.create({ user: req.user._id, product: productId, qty, size });
  res.json(item);
});

// POST /cart
router.post('/cart', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cartItem = await Cart.create({ product: productId, qty });
    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  await CartItem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Removed' });
});

module.exports = router;
