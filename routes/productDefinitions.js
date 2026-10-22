const productController = require('../controllers/productController')
const { cacheMiddleware, clearCacheMiddleware } = require('../middleware/cache')

const basePath = '/products'

// This workshop API has no authentication middleware: all routes are public.
// These definitions drive both Express registration and the permission audit.
const routes = [
    { method: 'GET', path: '/', access: 'public', handlers: [cacheMiddleware, productController.getAllProducts] },
    { method: 'GET', path: '/:id', access: 'public', handlers: [cacheMiddleware, productController.getProductById] },
    { method: 'POST', path: '/', access: 'public', handlers: [clearCacheMiddleware, productController.addProduct] },
    { method: 'PUT', path: '/:id', access: 'public', handlers: [clearCacheMiddleware, productController.replaceProduct] },
    { method: 'PATCH', path: '/:id', access: 'public', handlers: [clearCacheMiddleware, productController.updateProduct] },
    { method: 'DELETE', path: '/:id', access: 'public', handlers: [clearCacheMiddleware, productController.deleteProduct] }
]

module.exports = { basePath, routes }
