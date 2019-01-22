import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var StockInfoSchema = new Schema({
  id: String,
  name: String,
  max200: Number,
  max120: Number,
  min200: Number,
  min120: Number,
  noOfRecords: Number,
});

module.exports = mongoose.model('StockInfo', StockInfoSchema);