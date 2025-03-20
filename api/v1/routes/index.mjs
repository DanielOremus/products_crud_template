import { Router } from "express"
import productRoutes from "./products.mjs"
import categoryRoutes from "./categories.mjs"
const router = Router()

router.use("/products", productRoutes)
router.use("/categories", categoryRoutes)

export default router
