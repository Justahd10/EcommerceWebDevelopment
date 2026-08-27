const { doDbQuery } = require("../../helpers.js")
const { generateToken } = require('./tokens.js')
const { validateToken } = require('./tokens.js')



/* 
        Endpoints: /api/auth/login, /api/users/register
*/ 
function createAuthTokens(resource) {
    return (req, res, next) => {

    // Determine required tokens
    const tks = ["access_token"]
    if (req.body.remember_me) {
        tks.push("refresh_token")
    }

    for (const tk of tks){

        // Create token
        const creds = generateToken(
            { "type": "auth_token", "name": tk },
            {
                "id": req.locals.usr_id,
                "email": req.body.email
            }
        )

        if (tk === "refresh_token") {
            // Storage refresh token into database
            doDbQuery(
                resource, "refresh_tokens",
                "push", {
                    "user_id": req.locals.usr_id,
                    "token": creds.token,
                    "create_at": creds.create_at,
                    "expires": creds.expires
                }
            )
        }

        // Storage datas in local route runtime
        req.locals[tk] = creds
    }

    next()
}}

/* 
        Endpoints: /api/auth/refresh
*/
function refreshAccessToken(resource) {
    return (req, res, next) => {
    req.locals = req.locals ?? {}
    
    // get refresh token from request
    const refresh_tk = req.cookies.refresh_token

    // check validation result
    if (
        refresh_tk && 
        validateToken(refresh_tk, "auth_token", resource)
    ) {

        // Create new access token using the datas
        const token_datas = generateToken({
            'type': "auth_token", 
            'name': "access_token"
        }, {
            'id': refresh_tk.split(" ")[1], 
            'email': refresh_tk.split(" ")[2]
        })

        // Storage in local route runtime
        req.locals.access_token_datas = token_datas

        next()
    }
    // Unsuccessful case return
    else return res.sendStatus(401)
}}

/*
        Endpoints: Used by all protected endpoints
*/
function verifyAccessToken(resource){
    return (req, res, next) => {
        req.locals = req.locals ?? {}

        // get access token from request
        const access_tk = req.cookies.access_token
        
        // check validation result
        if (
            access_tk && 
            validateToken(access_tk, "auth_token", resource)
        ){
            req.locals.usr_id = access_tk.split(" ")[1]
            next()
        }
        // Unsuccessful case return
        else return res.sendStatus(401)
    }
}


module.exports = {
    createAuthTokens, refreshAccessToken, 
    verifyAccessToken
}