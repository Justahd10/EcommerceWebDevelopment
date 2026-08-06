const {generateToken, checkToken} = require('./helpers.js')


// "/api/login"
function searchUser(resource) {
    return (req, res, next) => {
        req.locals =  {}

        // Acces users resources
        const email = req.body.email
        const pass = req.body.password

        // Save informations next middlewares
        req.locals.email = email
        req.locals.pass = pass

        // Search by email and password
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
            return res.sendStatus(401)
        }
    }
}

function createUserAuth(resource) {
    return (req, res, next) => {

    req.locals.auth_tk = generateToken(
        type = "auth",
        id = req.locals.usr_id,
        email = req.locals.email
    )

    req.locals.refresh_tk = null
    if (req.body.remember_me) {
        const refresh_tk = 
        generateToken(
            "refresh", req.locals.usr_id, 
            req.locals.email
        )

        const refresh_tokens =
        resource.db.get("refresh_tokens")
        .push(
            {
                "user_id": req.locals.usr_id,
                "token": refresh_tk.token,
                "create_at": refresh_tk.create_at,
                "expires": refresh_tk.expires
            }
        ).write()
        
        req.locals.refresh_tk = refresh_tk.token
    }

    next()
}}

// "/api/refresh"
function validateRefreshToken(resource) {
    return (req, res, next) => {
    req.locals = {}

    const refresh_tk = req.header("refresh_token")

    const refresh_tks = resource.db.get("refresh_tokens")
    const register = refresh_tks.find(
        {"token": auth_tk}).value()

    if (
        refresh_tk && checkToken(refresh_tk) && register
    ) {
        const user = resource.db.get("users")
        .find({"id": register.user_id}).value()

        req.locals.auth_tk = generateToken(
            "auth", user.id, user.email
        )

        next()
    } else {
        return res.sendStatus(401)
    }
}}

// "/api/logout"
// the authToken is deleted by frontend (Cookies not HTTPOnly) 
const clearSession = (req, res, next, resource) => {
    const refresh_tk = req.header("Cookie")

    if (refresh_tk) {
        resource.db.get("refresh_tokens")
        .remove({"token": refresh_tk}).write()

        next()
    }
}


module.exports = {
    searchUser, createUserAuth,
    validateRefreshToken, clearSession
}