import { Router } from "express"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js"
import { verifyToken } from "../middlewares/verifytoken.js"
import { isAdmin } from "../middlewares/isAdmin.js"

const router = Router()

router.get("/products", getProducts)
router.post("/products", verifyToken, isAdmin, createProduct)
router.put("/products/:id", verifyToken, isAdmin, updateProduct)
router.delete("/products/:id", verifyToken, isAdmin, deleteProduct)

export default router
