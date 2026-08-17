const {generateToken, validateToken} = require('./helpers.js')


// "/api/login"
function getUserByCredentials(resource, creds) {
    return (req, res, next) => {
        req.locals = req.locals ??  {}

        const filter = {}
        for (const cred of creds){
            filter[cred] = req.body[cred]
            req.locals[cred] = req.body[cred]
        }

        const user = resource.db.get("users")
        .find(filter).value()
        
        if (user) {
            req.locals.usr_id = user.id
            next()
        } 
        else {
            if (creds === ["email"]){
                return res.sendStatus(202)
            }

            return res.sendStatus(401)
        }
    }
}


function createAuthentication(resource) {
    return (req, res, next) => {

    const tks = ["access_token"]
    if (req.body.remember_me) {
        tks.push("refresh_token")
    }

    for (const tk of tks){
        const creds = generateToken(
            tk,
            req.locals.usr_id,
            req.locals.email
        )

        if (tk === "refresh_token") {
            resource.db.get("refresh_tokens")
            .push(
                {
                    "user_id": req.locals.usr_id,
                    "token": creds.token,
                    "create_at": creds.create_at,
                    "expires": creds.expires
                }
            ).write()
        }

        req.locals[tk] = creds
    }

    next()
}}

// "/api/refresh"
function refreshToken(resource) {
    return (req, res, next) => {
    req.locals = req.locals ?? {}
    
    const refresh_tk = req.cookies.refresh_token

    const validated = 
    validateToken(refresh_tk, "auth_token", resource)

    if (refresh_tk && validated) {
        const user = resource.db.get("users")
        .find({"id": register.user_id}).value()

        const creds = createAuth(
            "access_token", user.id, user.email
        )

        req.locals.access_token = creds

        next()
    } else {
        return res.sendStatus(401)
    }
}}

// "/api/logout"
function clearSession (){}

// Used by all protected endpoints
function verifyAccessToken(req, res, next){
    req.locals = req.locals ?? {}

    const access_tk = req.cookies.access_token
    
    if (
        access_tk && 
        validateToken(access_tk, "auth_token")
    ){
        req.locals.usr_id = access_tk.split(" ")[1]
        next()

    } else {
        return res.sendStatus(401)
    }
}

module.exports = {
    getUserByCredentials, createAuthentication,
    refreshToken, clearSession,
    verifyAccessToken
}