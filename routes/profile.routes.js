import { Router } from 'express';
import { profileDelete, profileDetails, profilePut } from '../controllers/profile.controllers';
import { protect } from '../middleware';

const router = Router();

router
  .route('/')
  .get(protect, profileDetails)
  .put(protect, profilePut)
  .delete(protect, profileDelete);

export default router;
