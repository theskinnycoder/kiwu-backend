import { Router } from 'express';
import {
  orderDetails,
  orderDetailsDeliveryPending,
  orderPatchToDelivered,
  orderPatchToPaid,
  orderPost,
  ordersIndex,
  ordersIndexDeliveryPending,
} from '../controllers/order.controller';
import { isSuperAdmin, protect } from '../middleware';

const router = Router();

router.route('/me').get(protect, ordersIndex).post(protect, orderPost);
router.get('/me/:id', protect, orderDetails);
router.patch('/me/:id', protect, orderPatchToPaid);

// View, and mark as delivered pending products
router.get('/', protect, isSuperAdmin, ordersIndexDeliveryPending);
router.get('/:id', protect, isSuperAdmin, orderDetailsDeliveryPending);
router.patch('/:id', protect, isSuperAdmin, orderPatchToDelivered);

export default router;
