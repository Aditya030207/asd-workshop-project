const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const { cacheMiddleware, clearCacheMiddleware } = require("../middleware/cache")

router.get("/", cacheMiddleware, productController.getAllProducts)
router.get("/:id", cacheMiddleware, productController.getProductById)

router.post("/", clearCacheMiddleware, productController.addProduct)
router.put("/:id", clearCacheMiddleware, productController.replaceProduct)
router.patch("/:id", clearCacheMiddleware, productController.updateProduct)
router.delete("/:id", clearCacheMiddleware, productController.deleteProduct)

module.exports = router
