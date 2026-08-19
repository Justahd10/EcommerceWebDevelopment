const { validateToken } = require('./tokens.js')

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


module.exports = {refreshToken, verifyAccessToken}