const { sendResponse } = require('../helpers.js')
const { getUser, createUser } = require("./services/middlewares.js")
const { verifyAccessToken, createAuthTokens } = require("../auth/services/session.js")



function setUserRoutes(server, resources) {

    server.post("/api/users/register",
        getUser(resources, ['email']),
        (req, res, next) => {
            if (req.locals.user_datas){
                return sendResponse(res,
                    409,
                    'unsuccessful',
                    'Email alredy registered',
                    {}
                )
            }

            next()
        },
        createUser(resources),
        createAuthTokens(resources), (req, res) => {
            let tks = ["access_token", "refresh_token"]
            if (!req.body.remember_me){tks = tks.slice(0, 1)}

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
            return sendResponse(res,
                200,
                'success',
                null,
                {
                    'id': req.locals.id,
                    'email': req.locals.email,
                    'timestamp': new Date(Date.now()).toISOString()
                }
            )
        })
    
/*     server.get("/api/users/profile", 
        verifyAccessToken,
        getUser(resources, ['id'], 401),
        (req, res, next) => {
            const usr_datas = req.locals.usr_datas
            
            res.status(200)

            if (req.locals.usr_datas){
                res.json(
                    {
                        "status": "success",
                        "user": {
                            "email": usr_datas.email,
                            "password": usr_datas.senha
                        }
                    }
                )
            } else {
                res.json(
                    {
                        "status": "success",
                        "datas": {}
                    }
                )
            }
    }) */
}

module.exports = setUserRoutes