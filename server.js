const express = require("express")
const productRoutes = require("./routes/productRoutes")
const { basePath } = require("./routes/productDefinitions")
const app = express()
const port = 3000

app.use(express.json())
app.use(basePath, productRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
