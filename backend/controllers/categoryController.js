import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import mongoose from 'mongoose';

// @route   GET /api/category
// @desc    Fetch all categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @route   GET /api/category/:id
// @desc    Fetch single category by ID
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @route   PUT /api/category
// @desc    Add/Update product category with a new product
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name: categoryName, id: productId } = req.body;

  const category = await Category.findOne({ name: categoryName });

  if (category) {
    const exists = category.products.includes(productId);

    if (!exists) {
      await Category.findOneAndUpdate(
        { name: categoryName },
        {$push: {
          products: {
            $each: [mongoose.Types.ObjectId(productId)],
            $position: 0
          }
        }}
      );
    }

    return res.status(201).json({ message: 'Category Updated' });
  }

  const newCategory = new Category({
    name: categoryName,
    products: [mongoose.Types.ObjectId(productId)]
  });
  await newCategory.save();
  res.status(201).json({ message: 'Category Created'});
});

// @route   PUT /api/category/:category/:id
// @desc    Remove a product from the respective category
// @access  Private/Admin
const removeProductFromCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ name: req.params.category });

  if (category) {
    await Category.findOneAndUpdate(
      { name: req.params.category },
      {$pull: {
        products: mongoose.Types.ObjectId(req.params.id)
      }}
    );
    
    const category = await Category.findOne({ name: req.params.category });
    if (category.products.length === 0) {
      await Category.findOneAndDelete({ name: req.params.category });
    }

    return res.status(200).json({ message: 'Product Removed, Category Updated'});
  }

  return res.status(201).json({ message: 'Product Removed' });
});

export { 
  getCategories,
  getCategoryById,
  updateCategory,
  removeProductFromCategory 
};
