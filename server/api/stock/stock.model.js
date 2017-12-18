import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var StockSchema = new Schema({
  id: String,
  name: String,
  nav: String,
  repurchasePrice: String,
  salePrice: String,
  date: Date,
  separator: String,
  nav120: Number,
  nav200: Number,
  nav120Ratio: Number,
  nav200Ratio: Number,
});

module.exports = mongoose.model('Stock', StockSchema);