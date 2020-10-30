import express from 'express';
import { 
  getProducts, 
  getProductById, 
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getAllProductsByCategories,
  getAllProductsByCategory
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);
router.get('/category', getAllProductsByCategories);
router.get('/category/:category', getAllProductsByCategory);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
