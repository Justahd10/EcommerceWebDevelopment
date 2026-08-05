const path = require('path')
const json_server = require('json-server')

// Authentication routes
const setAuthRoutes = require('../routes/auth.js')

function ServerPipeline() {
    // Server instance
    const server = json_server.create()

    // Defaults middlewares
    server.use(json_server.defaults())

    // Enable body parser
    server.use(json_server.bodyParser)

    
    // Create resources
    const resources_f  = path.join(
        __dirname, "conf", "db.json"
    )
    const resources = json_server.router(resources_f)


    return server
}



module.exports = ServerPipeline
server.use(resources)


server.listen(3000, () => {
    console.log("JSON Server is running...")
})