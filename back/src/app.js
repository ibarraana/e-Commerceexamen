import express from "express";
import cors from "cors";

// 1. Importar los enrutadores principales
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import clientautoroutes from "./routes/clientautoroutes.js";

const app = express();

// 2. Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get("/", (req, res) => {
    res.json({
        mensaje: "API e-Commerce funcionando correctamente"
    });
});

// 3. Registrar los enrutadores con el prefijo /api
app.use("/api", adminAuthRoutes);  // Maneja login y métricas de admin
app.use("/api", clientautoroutes); // Maneja login y perfil de cliente

export default app;