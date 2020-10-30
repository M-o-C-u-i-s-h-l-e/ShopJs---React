import express from 'express';
import { 
  getCategories,
  getCategoryById,
  updateCategory,
  removeProductFromCategory
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/', getCategories)
  .get(getCategories)
  .put(protect, admin, updateCategory);
router.get('/:id', getCategoryById);
router.route('/:category/:id').put(protect, admin, removeProductFromCategory);

export default router;
