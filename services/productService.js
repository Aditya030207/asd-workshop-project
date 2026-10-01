const { readData, writeData } = require("../database/db")

async function getAllProducts() {
    return readData()
}

async function getProductById(id) {
    const products = await readData()
    return products.find((product) => product.id === id)
}

async function addProduct(name, price) {
    const products = await readData()
    let newId = 1

    if (products.length > 0) {
        newId = products[products.length - 1].id + 1
    }

    const newProduct = { id: newId, name, price }
    products.push(newProduct)
    await writeData(products)
    return newProduct
}

async function replaceProduct(id, name, price) {
    const products = await readData()
    const index = products.findIndex((product) => product.id === id)

    if (index === -1) {
        return null
    }

    products[index] = { id, name, price }
    await writeData(products)
    return products[index]
}

async function updateProduct(id, body) {
    const products = await readData()
    const product = products.find((item) => item.id === id)

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
    const products = await readData()
    const index = products.findIndex((product) => product.id === id)

    if (index === -1) {
        return null
    }

    const deleted = products[index]
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
