import { Router } from "express";
import { getAdminMetrics } from "../controllers/adminAuthController.js";
import { verifyToken } from "../middlewares/verifytoken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Endpoint privado: GET /api/admin/metricas
router.get("/admin/metricas", verifyToken, isAdmin, getAdminMetrics);

export default router;