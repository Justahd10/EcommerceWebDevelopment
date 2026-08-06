const {
    generateToken, checkToken
} = require('./helpers.js')


// "/api/login"
function searchUser(resource) {
    return (req, res, next) => {
        req.locals = {}

        // Acces users resources
        const usr_email = req.body.email
        const usr_pass = req.body.password

        // Save informations next middlewares
        req.locals.email = usr_email
        req.locals.pass = usr_pass

        // Search by email and password
        const users = resource.db.get("users")
        const user = users.find(
            {
                "email": usr_email, 
                "senha": usr_pass
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
    // Create auth token and save
    // for the route response
    req.locals.auth_tk = generateToken(
        type = "auth",
        id = req.locals.usr_id,
        email = req.locals.email
    )
    
    if (req.body.remember_me) {
        // Create refresh token and save
        // for the route response
        const refresh_tk = 
        generateToken(
            type = "refresh", 
            id = req.locals.usr_id, 
            email = req.locals.email
        )

        // Append into refresh_tokens.json
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
// Refresh token => req.header("Cookie")

function validateRefreshToken(resource) {
    return (req, res, next) => {
    // Init validation flag and local datas
    let valid = false; req.locals = {}

    // Access refresh token
    const auth_tk = req.header("Cookie")

    // Check if is registered
    const refresh_tks = resource.db.get("refresh_tokens")
    const register = refresh_tks.find(
        {"token": auth_tk}).value()

    // Check if token is not exired
    if (auth_tk && checkToken(auth_tk)) {
        valid = true
    }

    // Check if are registered
    if (!register) {valid = false}

    // Create a new auth token if validated
    if (valid) {
        // Get user datas
        const user = resource.db.get("users")
        .find({"id": register.user_id}).value()

        // Create a new auth token
        req.locals.auth_tk = generateToken(
            type = "auth",
            id = user.id,
            email = user.email
        ).token

        next()
    } else {
        // Send unathourized response
        return res.sendStatus(401)
    }
}}

// "/api/logout"
// Remove both auth and refresh tokens

const clearSession = (req, res, next, resource) => {
    // Access client refrehs token
    const refresh_tk = req.header("Cookie")

    if (refresh_tk) {
        // Delete in refresh_tokens.json 
        resource.db.get("refresh_tokens")
        .remove({"token": refresh_tk}).write()

        next()
    }
}


module.exports = {
    searchUser, createUserAuth,
    validateRefreshToken,
    clearSession
}