import { Router } from 'express';
import {
  designerDelete,
  designerDetails,
  designerPatch,
  designerPut,
  designersIndex,
  makeDesigner,
} from '../controllers/designer.controllers';
import { isSuperAdmin, protect } from '../middleware';

const router = Router();

router
  .route('/')
  .get(designersIndex)
  .patch(protect, isSuperAdmin, designerPatch)
  .post(protect, isSuperAdmin, makeDesigner);

router
  .route('/:id')
  .get(designerDetails)
  .put(protect, isSuperAdmin, designerPut)
  .patch(protect, isSuperAdmin, designerPatch)
  .delete(protect, isSuperAdmin, designerDelete);

export default router;
