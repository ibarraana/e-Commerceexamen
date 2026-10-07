import express from "express"
import cors from "cors"

// 1. Importar los enrutadores principales
import adminAuthRoutes from "./routes/adminAuthRoutes.js"
import clientautoroutes from "./routes/clientautoroutes.js"
import productRoutes from "./routes/productRouter.js"

const app = express()

app.use(cors());
app.use(express.json());

// Ruta de prueba inicial con función clásica
app.get("/", function (req, res) {
    return res.json({
        mensaje: "API e-Commerce funcionando correctamente"
    })
})

// 3. Registrar los enrutadores con el prefijo /api
app.use("/api", adminAuthRoutes) // Maneja login y métricas de admin
app.use("/api", clientautoroutes) // Maneja login y perfil de cliente
app.use("/api", productRoutes)

export default app;


