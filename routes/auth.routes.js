import { Router } from 'express';
import { login, logout, register } from '../controllers/auth.controllers';
import { protect } from '../middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);

export default router;
