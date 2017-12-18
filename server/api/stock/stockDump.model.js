import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var StockDumpSchema = new Schema({
  id: String,
  name: String,
  nav: String,
  repurchasePrice: String,
  salePrice: String,
  date: Date,
  separator: String,
});

module.exports = mongoose.model('StockDump', StockDumpSchema);