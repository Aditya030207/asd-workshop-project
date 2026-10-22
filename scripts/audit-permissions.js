const { auditRoutes } = require('permission-gap-detector')
const { basePath, routes } = require('../routes/productDefinitions')

function getRouteDeclarations() {
    return routes.map(({ method, path, access }) => ({
        method,
        path: path === '/' ? basePath : basePath + path,
        access
    }))
}

function getDemoDeclarations() {
    // Modify a copy only: the running server's routes stay unchanged.
    const declarations = getRouteDeclarations()
    const deletion = declarations.find(route => route.method === 'DELETE')
    delete deletion.access
    declarations.push({ ...declarations[0], access: 'admin' })
    return declarations
}

function main(args) {
    if (args.some(arg => !['--demo', '--json'].includes(arg))) {
        console.error('Usage: node scripts/audit-permissions.js [--demo] [--json]')
        return 2
    }
    const demo = args.includes('--demo')
    const result = auditRoutes(demo ? getDemoDeclarations() : getRouteDeclarations())
    if (args.includes('--json')) {
        console.log(JSON.stringify(result, null, 2))
    } else {
        console.log(demo ? 'Permission Gap Detector: intentional failure demo' : 'Permission Gap Detector: product API')
        console.log(`Routes: ${result.summary.totalRoutes}`)
        console.log(`Permission coverage: ${result.summary.coveragePercentage}%`)
        console.log(`Missing permissions: ${result.summary.missingPermissions}`)
        console.log(`Duplicate definitions: ${result.summary.duplicateRoutes}`)
        console.log(`Conflicting route groups: ${result.summary.conflictingRoutes}`)
        if (result.hasIssues) console.log(JSON.stringify(result.findings, null, 2))
        else console.log('No declaration issues found. This does not verify access enforcement.')
    }
    return result.hasIssues ? 1 : 0
}

if (require.main === module) process.exitCode = main(process.argv.slice(2))

module.exports = { getRouteDeclarations, getDemoDeclarations }
