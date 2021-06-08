import { Router } from 'express';
import {
  productApprove,
  productDecline,
  productDelete,
  productDetails,
  productPendingDetails,
  productPost,
  productPut,
  productsIndex,
  productsPendingIndex,
} from '../controllers/product.controllers';
import { isAdmin, isSuperAdmin, protect } from '../middleware';

const router = Router();

router.route('/').get(productsIndex).post(protect, isAdmin, productPost);

router
  .route('/:id')
  .get(productDetails)
  .put(protect, isAdmin, productPut)
  .delete(protect, isAdmin, productDelete);

// View, approve & decline pending products
router.get('/pending', protect, isSuperAdmin, productsPendingIndex);
router.get('/pending/:id', protect, isSuperAdmin, productPendingDetails);
router.post('/pending/:id/approve', protect, isSuperAdmin, productApprove);
router.post('/pending/:id/decline', protect, isSuperAdmin, productDecline);

export default router;
