// Middlwares functionalitys
const {
    getUserByCredentials, createAuthentication, 
    refreshToken, clearSession, verifyAccessToken
} = require('./services/middlewares.js')


function setAuthRoutes(server, resources) {
    server.post("/api/auth/login",
        getUserByCredentials(resources, ["email", "password"]), 
        createAuthentication(resources), (
        req, res, next
    ) => {
        
        let tks = ["access_token", "refresh_token"]
        if (!req.body.remember_me) {
            tks = tks.slice(0, 1)
        }

        // Response header
        for (const item of tks) {
            res.cookie(
                item, req.locals[item].token,
                {
                    "expires": req.locals[item].expires,
                    "httpOnly": true
                }
            )
        }

        // Response body
        res.status(200).json(
            {
                "status": "success",
                "email": req.locals.email,
                "timestamp": new Date(Date.now()).toISOString()
            }
        )
    })

    server.get("/api/auth/test", 
        verifyAccessToken, (req, res, next) => {
            res.sendStatus(200)
        }
    )

    server.get("/api/auth/refresh", 
        refreshToken(resources), (req, res, next) => {
        
        // Response header
        res.cookie(
            "access_token", req.locals.access_token.token,
            {
                "expires": req.locals.access_token.expires,
                "httpOnly": true
            }
        )

        // Resposne body
        res.sendStatus(200)
    })


/*     server.post("/api/logout", clearSession, (
        req, res, next, resource
    ) => {
        // Logic for logout proccesing
    }) */
}


module.exports = setAuthRoutes