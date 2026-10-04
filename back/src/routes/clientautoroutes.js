import { Router } from 'express';
import { loginClient, getClientProfile } from '../controllers/clientAuthController.js';
import { verifyToken } from '../middlewares/verifytoken.js';
import { isClient } from '../middlewares/isclient.js';

const router = Router();

// Rutas públicas
router.post('/auth/client/login', loginClient);

// Rutas privadas para Cliente
router.get('/client/perfil', verifyToken, isClient, getClientProfile);

export default router;