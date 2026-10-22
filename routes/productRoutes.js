const express = require('express')
const { routes } = require('./productDefinitions')
const router = express.Router()

for (const route of routes) {
    router[route.method.toLowerCase()](route.path, ...route.handlers)
}

module.exports = router
