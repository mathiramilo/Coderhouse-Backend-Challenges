const { HTTP_STATUS } = require('../constants/api.constants')
const { successResponse } = require('../utils/api.utils')
const {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  mockProducts
} = require('../services/products.services')

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const products = await getProducts()
      const response = successResponse(products)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params
    try {
      const product = await getProduct(id)
      const response = successResponse(product)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async saveProduct(req, res, next) {
    try {
      const newProduct = await saveProduct(req.body)
      const response = successResponse(newProduct)
      res.status(HTTP_STATUS.CREATED).json(response)
    } catch (err) {
      next(err)
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params
    try {
      const updatedProduct = await updateProduct(id, req.body)
      const response = successResponse(updatedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params
    try {
      const deletedProduct = await deleteProduct(id)
      const response = successResponse(deletedProduct)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  async mockProducts(req, res, next) {
    try {
      const products = mockProducts()
      const response = successResponse(products)
      res.json(response)
    } catch (error) {
      next(err)
    }
  }
}

module.exports = new ProductsController()
