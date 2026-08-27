const { sendResponse } = require('../helpers.js')
const { getUser } = require('../user/services/middlewares.js')
const { 
    createAuthTokens, refreshAccessToken, verifyAccessToken
 } = require('./services/session.js')

const { 
    registerResetPassToken, sendPassResetEmail,
    validateResetToken, resetPassword
 } = require('./services/pass_reset.js')



function setAuthRoutes(server, resources) {

    server.post("/api/auth/login",
        getUser(resources, ["email", "password"]),
        (req, res, next) => { 
            if (!req.locals.user_datas){
                return sendResponse(res,
                    401,
                    'unsuccessful',
                    'Invalid credentials',
                    {}
                )
            }

            next()
        },
        createAuthTokens(resources), 
        (req, res) => {
        
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
            return sendResponse(res, 200, "successful", "", {
                'id': req.locals.id,
                'email': req.body.email,
                'timestamp': new Date(Date.now()).toISOString()
            })
        }
    )

    server.get("/api/auth/test", 
        verifyAccessToken(resources),
        (req, res, next) => {
            return sendResponse(res,
                200, 
                "successful",
                null,
                {}
            )
        }
    )

    server.get("/api/auth/refresh", 
        refreshAccessToken(resources), (req, res, next) => {
        
        // Response header
        res.cookie(
            "access_token", req.locals.access_token_datas.token,
            {
                "expires": req.locals.access_token_datas.expires,
                "httpOnly": true
            }
        )

        // Response body
        return sendResponse(res,
            200,
            'successful',
            null,
            {}
        )
    })

    server.post(
        "/api/auth/pass_reset_request",
        getUser(resources, ['email']),
        (req, res, next) => {
            if (!req.locals.user_datas){
                return sendResponse(res, 
                    202, 
                    'successful', 
                    null, 
                    {}
                )
            }

            next()
        },
        registerResetPassToken(resources),
        sendPassResetEmail(resources),
        (req, res, next) => sendResponse(res, 
            202, 
            'successful', 
            null, 
            {}
        )
    )

    server.post(
        "/api/auth/pass_reset_validate",
        validateResetToken(resources),
        (req, res, next) => {
            
            if (req.locals.valid_reset_tk){
                return sendResponse(res,
                    200, 
                    'successful',
                    null,
                    {}
                )
            } else {
                return sendResponse(res,
                    401,
                    'unsuccessful',
                    'Invalid token',
                    {}
                )
            }
        }
    )

    server.post(
        "/api/auth/pass_reset_confirm",
        resetPassword(resources),
        (req, res, next) => {
            
            if (req.locals.valid_request){
                return sendResponse(res,
                    200,
                    'successful',
                    null,
                    {}
                )
            } else {
                return sendResponse(res,
                    401,
                    'unsuccessful',
                    'Invadli password reset code',
                    {}
                )
            }
        }
    )
}


module.exports = setAuthRoutes