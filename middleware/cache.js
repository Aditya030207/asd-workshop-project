// "/products" -- { data: [], createdAt: time }
// "/products/1" -- { data: {}, createdAt: time }
let cache = {}
const TTL = 60 * 1000 // 1 minute

// for GET routes
function cacheMiddleware(req, res, next) {
    let key = req.originalUrl
    let cached = cache[key]

    if (cached) {
        let age = Date.now() - cached.createdAt
        if (age < TTL) {
            // not expired, use the cache
            res.set("X-Cache", "HIT")
            res.json(cached.data)
            return
        }
        // expired, remove it and get fresh data
        delete cache[key]
    }

    res.set("X-Cache", "MISS")

    // change res.json so the data gets saved in cache when controller sends it
    let originalJson = res.json.bind(res)
    res.json = (data) => {
        cache[key] = { data: data, createdAt: Date.now() }
        originalJson(data)
    }

    next()
}

// for POST, PUT, PATCH, DELETE routes
function clearCacheMiddleware(req, res, next) {
    // runs after response is sent
    res.on("finish", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache = {}
        }
    })
    next()
}

module.exports = { cacheMiddleware, clearCacheMiddleware }
