import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
