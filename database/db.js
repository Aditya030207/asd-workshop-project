const fs = require("fs/promises")
const path = require("path")
const filePath = path.join(__dirname, "..", "db.json")

async function delay() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500)
    })
}

async function readData() {
    await delay()
    const products = await fs.readFile(filePath, "utf-8")
    return JSON.parse(products)
}

async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

module.exports = { readData, writeData }
