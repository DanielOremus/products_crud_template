import { Router } from "express"
import ProductController from "../controllers/ProductController.mjs"
import upload from "../../../middlewares/multer.mjs"
import { checkSchema } from "express-validator"
import ProductValidator from "../validators/ProductValidator.mjs"
import { checkIdFormat } from "../../../middlewares/checkIdFormat.mjs"

const router = Router()

router.get("/", ProductController.fetchProductsWithQuery)

router.get(
  "/:id",
  checkIdFormat("id", "params"),
  ProductController.fetchProductById
)

router.post(
  "/",
  upload.single("image"),
  checkSchema(ProductValidator.defaultSchema),
  ProductController.createOrUpdateProduct
)

router.put(
  "/:id",
  upload.single("image"),
  checkIdFormat("id", "params"),
  checkSchema(ProductValidator.defaultSchema),
  ProductController.createOrUpdateProduct
)

router.delete("/", checkIdFormat("id", "body"), ProductController.deleteProduct)

export default router
