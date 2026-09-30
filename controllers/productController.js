const productService = require("../services/productService")

async function getAllProducts(req, res) {
    try {
        let data = await productService.getAllProducts()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
    }
}

async function getProductById(req, res) {
    let id = Number(req.params.id)
    try {
        let product = await productService.getProductById(id)
        if (product) {
            res.json(product)
        } else {
            res.status(404).send("Product not found")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
    }
}

async function addProduct(req, res) {
    let name = req.body.name
    let price = req.body.price
    try {
        if (name && price) {
            let newProduct = await productService.addProduct(name, price)
            res.status(201).json(newProduct)
        } else {
            res.status(400).send("Name and price are required")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
    }
}

async function replaceProduct(req, res) {
    let id = Number(req.params.id)
    let name = req.body.name
    let price = req.body.price
    try {
        if (name && price) {
            let product = await productService.replaceProduct(id, name, price)
            if (product) {
                res.json(product)
            } else {
                res.status(404).send("Product not found")
            }
        } else {
            res.status(400).send("Name and price are required")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
    }
}

async function updateProduct(req, res) {
    let id = Number(req.params.id)
    try {
        let product = await productService.updateProduct(id, req.body)
        if (product) {
            res.json(product)
        } else {
            res.status(404).send("Product not found")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
    }
}

async function deleteProduct(req, res) {
    let id = Number(req.params.id)
    try {
        let product = await productService.deleteProduct(id)
        if (product) {
            res.json({ message: "Product deleted", product: product })
        } else {
            res.status(404).send("Product not found")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
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
