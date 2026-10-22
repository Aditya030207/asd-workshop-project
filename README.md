# Product API workshop

A small Express product API backed by `db.json`, with response caching for reads and cache invalidation after successful writes.

## Run

Requires Node.js 20 or newer.

```bash
npm ci
npm start
```

The server listens on port 3000. Routes are GET/POST `/products` and GET/PUT/PATCH/DELETE `/products/:id`.

## Permission Gap Detector integration

This repository uses the published [permission-gap-detector](https://www.npmjs.com/package/permission-gap-detector) version **1.0.2** as a development dependency. Its source is [npm-package-project](https://github.com/Aditya030207/npm-package-project).

`routes/productDefinitions.js` is the shared route list. Express registers its paths and handlers through `routes/productRoutes.js`; `scripts/audit-permissions.js` converts those same definitions to full paths and calls the installed package's `auditRoutes()` API. Add new product routes to this shared list so they are included in both the server and audit.

The current workshop API has no authentication or authorization middleware. All six routes are accurately declared `public`, including writes. Permission declarations document the current behavior; they do not enforce access. Changing a label to `admin` would not protect a route without corresponding middleware.

### Check the actual application

```bash
npm run audit:permissions
npm run audit:permissions -- --json
```

Expected result: **6 routes, 100% declaration coverage, no missing permissions, duplicates, or conflicts**, exit code 0. This describes declaration completeness, not application security.

### Show the package detecting problems

```bash
npm run demo:permissions
npm run demo:permissions -- --json
```

The demo copies the actual route declarations, removes the DELETE permission, and adds another GET `/products` declaration with a conflicting `admin` policy. It does not change the server configuration or write to the database.

Expected result: **7 definitions, 85.7% coverage, 1 missing permission, 1 extra duplicate, and 1 conflicting route group**. It deliberately exits with code **1**, proving that an audit with findings fails. The JSON report identifies DELETE `/products/:id` and GET `/products` as the affected routes.

For a short demonstration, run the clean audit first, then the failure demo, then explain the difference using the JSON findings. To try a real edit, temporarily remove one `access` field in `routes/productDefinitions.js` and run the normal audit; restore it afterward.

### Tests

```bash
npm test
```

Tests verify the installed npm version, six real route declarations, Express handler registration, failure detection, command exit codes, and a live GET `/products` request with cache MISS/HIT behavior. They do not modify product data.
