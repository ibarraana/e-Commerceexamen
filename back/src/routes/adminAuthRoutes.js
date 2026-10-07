import { Router } from 'express'
import { loginAdmin, getAdminMetrics } from '../controllers/adminAuthController.js'
import { verifyToken } from '../middlewares/verifytoken.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { checkRolAdmin } from "../middlewares/checkRolAdmin.js"
import { verificarYRenovarToken, invalidarSesionBackend } from '../controllers/authController.js';
 
const router = Router()

router.post('/auth/admin/login', loginAdmin)

router.get('/admin/metricas', verifyToken, isAdmin, getAdminMetrics)

router.post('/auth/refresh', verificarYRenovarToken)
router.post('/auth/logout', invalidarSesionBackend)

router.get('/admin/usuarios', verifyToken, isAdmin, checkRolAdmin(['superadmin']), (req, res) => {
    return res.json({
        message: "Lista de usuarios del sistema obtenida correctamente."
    });
});

router.post('/admin/productos', verifyToken, isAdmin, checkRolAdmin(['superadmin', 'gestor_productos']), (req, res) => {
    return res.json({
        message: "Producto creado exitosamente en el catálogo."
    });
});

router.get('/admin/reportes', verifyToken, isAdmin, checkRolAdmin(['superadmin', 'auditor']), (req, res) => {
    return res.json({
        message: "Reportes de auditoría y métricas del sistema generados."
    });
});

export default router;