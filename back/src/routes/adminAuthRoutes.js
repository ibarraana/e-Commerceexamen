import { Router } from 'express';
import { loginAdmin, getAdminMetrics } from '../controllers/adminAuthController.js';
import { verifyToken } from '../middlewares/verifytoken.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

// Rutas públicas
router.post('/auth/admin/login', loginAdmin);

// Rutas privadas para Admin
router.get('/admin/metricas', verifyToken, isAdmin, getAdminMetrics);

export default router;