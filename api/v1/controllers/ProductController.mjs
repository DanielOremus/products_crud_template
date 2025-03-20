import ImageManager from "../../../utils/ImageManager.mjs"
import ProductManager from "../models/product/ProductManager.mjs"
import { validationResult } from "express-validator"

class ProductController {
  static async fetchProducts(req, res) {
    try {
      const { documents, count } = await ProductManager.getList(
        {},
        null,
        null,
        ["category"]
      )
      return res.json({ success: true, data: { products: documents, count } })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async fetchProductsWithQuery(req, res) {
    const userQuery = req.query
    console.log(userQuery)

    try {
      const { documents, count } = await ProductManager.getListWithQuery(
        userQuery,
        null,
        ["category"]
      )
      return res.json({ success: true, data: { products: documents, count } })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async fetchProductById(req, res) {
    const id = req.params.id
    try {
      const product = await ProductManager.getById(id, null, ["category"])
      if (!product)
        return res
          .status(404)
          .json({ success: false, msg: "Product by id not found" })
      res.json({
        success: true,
        data: {
          product,
        },
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async createOrUpdateProduct(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: errors.array() })
    }
    const id = req.params.id
    const { name, description, price, mass, category, toDeleteImg } = req.body

    let image = req.file?.buffer
      ? await ImageManager.getOptimizedImg(req.file)
      : undefined
    let product

    try {
      if (id) {
        product = await ProductManager.getById(id)
        if (!product)
          return res
            .status(404)
            .json({ success: false, msg: "Target product not found" })
        product = await ProductManager.updateById(id, {
          name,
          description,
          price,
          mass,
          category,
          image: toDeleteImg ? null : image,
        })
        res.json({ success: true, data: { product } })
      } else {
        product = await ProductManager.create({
          name,
          description,
          price,
          mass,
          category,
          image,
        })
        res.status(201).json({ success: true, data: { product } })
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
  static async deleteProduct(req, res) {
    const id = req.body.id
    if (!id)
      return res
        .status(400)
        .json({ success: false, msg: "Id must be provided" })
    try {
      const product = await ProductManager.deleteById(id)
      if (!product)
        return res
          .status(404)
          .json({ success: false, msg: "Target product not found" })
      res.json({ success: true, msg: "Product deleted successfully" })
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message })
    }
  }
}

export default ProductController
