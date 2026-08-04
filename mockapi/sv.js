const path = require('path')
const sv_routes = require('./conf/routes.json')
const json_server = require('json-server')


// Server instance
const server = json_server.create()

// Middlewares
server.use(json_server.defaults())

// Routes
const routes = json_server.rewriter(sv_routes)
server.use(routes)

// Endpoints
server.use(json_server.bodyParser) // Body parser

server.get('/echo', (req, res) => {
    res.json(
        {
            "route_status": "Users called"
        }
    )
})

server.post('/echo', (req, res) => {
    const response = Object.assign(
        {"route_status": "Posting"}, req.body
    )
    res.json(response)
})

// Resources
const resources_f  = path.join(
    __dirname, "conf", "db.json"
)
const resources = json_server.router(resources_f)
server.use(resources)


server.listen(3000, () => {
    console.log("JSON Server is running...")
})