const { doDbQuery } = require("../../helpers.js")
const { generateToken } = require('./tokens.js')


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
            if (creds.length == 1 && creds.includes("email")){
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
            { "type": "auth_token", "name": tk },
            {
                "id": req.locals.usr_id,
                "email": req.locals.email
            }
        )

        if (tk === "refresh_token") {
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

        req.locals[tk] = creds
    }

    next()
}}


module.exports = {getUserByCredentials, createAuthentication}