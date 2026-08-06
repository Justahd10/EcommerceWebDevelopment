const path = require('path')
const json_server = require('json-server')

// Authentication routes
const setAuthRoutes = require('../routes/auth/auth.js')



function ServerPipeline() {
    // Create server instance
    const sv = json_server.create()

    // Create resources
    const resources_f  = path.join(
        __dirname, "db.json"
    )
    const resources = json_server.router(resources_f)

    // Set Defaults middlewares
    sv.use(json_server.defaults())
    
    // Set Enable body parser BEFORE routes
    sv.use(json_server.bodyParser)

    // Set routes
    setAuthRoutes(sv, resources)

    // Set resources
    sv.use(resources)
    
    return sv
}


module.exports = ServerPipeline