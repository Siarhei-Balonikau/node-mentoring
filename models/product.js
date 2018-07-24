import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
  name: String,
  price: Number
});

module.exports = mongoose.model('Product', ProductSchema);
