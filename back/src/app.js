import express from "express"
import cors from "cors"

import adminAuthRoutes from "./routes/adminAuthRoutes.js"
import clientautoroutes from "./routes/clientautoroutes.js"
import productRoutes from "./routes/productRouter.js"

const app = express()

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    return res.json({
        mensaje: "API e-Commerce funcionando correctamente"
    })
})

app.use("/api", adminAuthRoutes) 
app.use("/api", clientautoroutes)
app.use("/api", productRoutes)

export default app;


