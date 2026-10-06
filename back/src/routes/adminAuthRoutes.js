import { Router } from 'express'
import { loginAdmin, getAdminMetrics } from '../controllers/adminAuthController.js'
import { verifyToken } from '../middlewares/verifytoken.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { checkRolAdmin } from "../middlewares/checkRolAdmin.js"
 
const router = Router()

// Rutas públicas
router.post('/auth/admin/login', loginAdmin)

// Rutas privadas para Admin
router.get('/admin/metricas', verifyToken, isAdmin, getAdminMetrics)


// ● GET /api/admin/usuarios → Exclusivo superadmin
router.get('/admin/usuarios', verifyToken, isAdmin, checkRolAdmin(['superadmin']), (req, res) => {
    return res.json({
        message: "Lista de usuarios del sistema obtenida correctamente."
    });
});

// ● POST /api/admin/productos → Habilitado para superadmin y gestor_productos
router.post('/admin/productos', verifyToken, isAdmin, checkRolAdmin(['superadmin', 'gestor_productos']), (req, res) => {
    return res.json({
        message: "Producto creado exitosamente en el catálogo."
    });
});

// ● GET /api/admin/reportes → Habilitado para superadmin y auditor
router.get('/admin/reportes', verifyToken, isAdmin, checkRolAdmin(['superadmin', 'auditor']), (req, res) => {
    return res.json({
        message: "Reportes de auditoría y métricas del sistema generados."
    });
});

export default router;