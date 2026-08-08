const {createAuth, checkToken} = require('./helpers.js')


// "/api/login"
function searchUser(resource) {
    return (req, res, next) => {
        req.locals = req.locals ??  {}

        const email = req.body.email
        const pass = req.body.password

        req.locals.email = email
        req.locals.pass = pass

        const users = resource.db.get("users")
        const user = users.find(
            {
                "email": email, 
                "senha": pass
            }
        ).value()
        
        if (user) {
            req.locals.usr_id = user.id
            next()
        } 
        else {
            return res.status(401).json(
                {
                    "status": "unsuccessful",
                    "error": "Account not found"
                }
            )
        }
    }
}

function createUserAuth(resource) {
    return (req, res, next) => {

    const tks = ["access_token"]
    if (req.body.remember_me) {tks.push("refresh_token")}

    for (const tk of tks){
        const creds = createAuth(
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

    const register = resource.db.get("refresh_tokens")
    .find({"token": refresh_tk}).value()

    if (
        refresh_tk && checkToken(refresh_tk) && register
    ) {
        const user = resource.db.get("users")
        .find({"id": register.user_id}).value()

        const creds = generateToken(
            "access_token", user.id, user.email
        )

        req.locals.access_token = creds

        next()
    } else {
        return res.sendStatus(401)
    }
}}

// "/api/logout"
const clearSession = (req, res, next, resource) => {
    const refresh_tk = req.header("refresh_token")

    if (refresh_tk) {
        resource.db.get("refresh_tokens")
        .remove({"token": refresh_tk}).write()

        next()
    }
}

// Used by all protected endpoints
function verifyAccessToken(req, res, next){
    req.locals = req.locals ?? {}

    const access_tk = req.cookies.access_token

    if (access_tk && checkToken(access_tk)){
        req.locals.usr_id = access_tk.split(" ")[1]
        next()

    } else {
        res.status(401).json(
            {
                "status": "unsuccessful",
                "error": "Invalid access token"
            }
        )
    }
}

module.exports = {
    searchUser, createUserAuth,
    refreshToken, clearSession,
    verifyAccessToken
}