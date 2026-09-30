const { readData, writeData } = require("../database/db")

async function getAllProducts() {
    let products = await readData()
    return products
}

async function getProductById(id) {
    let products = await readData()
    let product = products.find((item) => item.id === id)
    return product
}

async function addProduct(name, price) {
    let products = await readData()
    let newId = 1
    if (products.length > 0) {
        newId = products[products.length - 1].id + 1
    }
    let newProduct = { id: newId, name: name, price: price }
    products.push(newProduct)
    await writeData(products)
    return newProduct
}

// PUT - replace whole product
async function replaceProduct(id, name, price) {
    let products = await readData()
    let index = products.findIndex((item) => item.id === id)
    if (index === -1) {
        return null
    }
    products[index] = { id: id, name: name, price: price }
    await writeData(products)
    return products[index]
}

// PATCH - change only what is sent
async function updateProduct(id, body) {
    let products = await readData()
    let product = products.find((item) => item.id === id)
    if (!product) {
        return null
    }
    if (body.name) {
        product.name = body.name
    }
    if (body.price) {
        product.price = body.price
    }
    await writeData(products)
    return product
}

async function deleteProduct(id) {
    let products = await readData()
    let index = products.findIndex((item) => item.id === id)
    if (index === -1) {
        return null
    }
    let deleted = products[index]
    products.splice(index, 1)
    await writeData(products)
    return deleted
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}
