// Middlwares functionalitys
const {
    searchUser, createUserAuth, 
    validateRefreshToken, clearSession
} = require('./services/middlewares.js')


function setAuthRoutes(server, resources) {
    server.post("/api/login",
        searchUser(resources), createUserAuth(resources), (
        req, res, next
    ) => {

        res.status(200).json(
            {
                "status": "success",
                "email": req.locals.email,
                "auth_token": req.locals.auth_tk,
                "refresh_token": req.locals.refresh_tk,
                "timestamp": new Date(Date.now()).toISOString()
            }
        )
    })

    server.post("/api/refresh", 
        validateRefreshToken(resources), (
        req, res, next
    ) => {
        
        res.status(200).json(
            {
                "status": "success",
                "auth_token": req.locals.auth_tk
            }
        )
    })


/*     server.post("/api/logout", clearSession, (
        req, res, next, resource
    ) => {
        // Logic for logout proccesing
    }) */
}


module.exports = setAuthRoutes