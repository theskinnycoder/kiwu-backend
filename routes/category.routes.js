import { Router } from 'express';
import { categoryDetails, categoryIndex, categoryPost } from '../controllers/category.controller';
import { isSuperAdmin, protect } from '../middleware';

const router = Router();

router.route('/').get(categoryIndex).post(protect, isSuperAdmin, categoryPost);
router.get('/:id', categoryDetails);

export default router;
