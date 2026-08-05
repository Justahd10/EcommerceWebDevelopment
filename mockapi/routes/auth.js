const {} = require('../conf/middlewares')



function setAuthRoutes(server) {
    server.post("/login")


    server.post("/refresh")


    server.post("/logout")
}

module.exports = setAuthRoutes