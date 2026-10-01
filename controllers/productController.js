const productService = require("../services/productService")

function handleError(res, error) {
    console.error(error)
    res.status(500).send("Something went wrong")
}

async function getAllProducts(req, res) {
    try {
        const data = await productService.getAllProducts()
        res.json(data)
    } catch (error) {
        handleError(res, error)
    }
}

async function getProductById(req, res) {
    const id = Number(req.params.id)

    try {
        const product = await productService.getProductById(id)
        if (product) {
            res.json(product)
        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        handleError(res, error)
    }
}

async function addProduct(req, res) {
    const { name, price } = req.body

    try {
        if (name && price) {
            const newProduct = await productService.addProduct(name, price)
            res.status(201).json(newProduct)
        } else {
            res.status(400).send("Name and price are required")
        }
    } catch (error) {
        handleError(res, error)
    }
}

async function replaceProduct(req, res) {
    const id = Number(req.params.id)
    const { name, price } = req.body

    try {
        if (name && price) {
            const product = await productService.replaceProduct(id, name, price)
            if (product) {
                res.json(product)
            } else {
                res.status(404).send("Product not found")
            }
        } else {
            res.status(400).send("Name and price are required")
        }
    } catch (error) {
        handleError(res, error)
    }
}

async function updateProduct(req, res) {
    const id = Number(req.params.id)

    try {
        const product = await productService.updateProduct(id, req.body)
        if (product) {
            res.json(product)
        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        handleError(res, error)
    }
}

async function deleteProduct(req, res) {
    const id = Number(req.params.id)

    try {
        const product = await productService.deleteProduct(id)
        if (product) {
            res.json({ message: "Product deleted", product })
        } else {
            res.status(404).send("Product not found")
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}
