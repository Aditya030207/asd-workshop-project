let cache = {}
const TTL = 60 * 1000

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl
    const cached = cache[key]

    if (cached) {
        const age = Date.now() - cached.createdAt
        if (age < TTL) {
            res.set("X-Cache", "HIT")
            res.json(cached.data)
            return
        }

        delete cache[key]
    }

    res.set("X-Cache", "MISS")

    const originalJson = res.json.bind(res)
    res.json = (data) => {
        cache[key] = { data, createdAt: Date.now() }
        originalJson(data)
    }

    next()
}

function clearCacheMiddleware(req, res, next) {
    res.on("finish", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache = {}
        }
    })
    next()
}

module.exports = { cacheMiddleware, clearCacheMiddleware }
