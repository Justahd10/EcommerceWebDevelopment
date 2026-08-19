const path = require('path')
const cookieParser = require('cookie-parser')

const setAuthRoutes = require('../routes/auth/auth.js')
const setUserRoutes = require('../routes/user/user.js')
const {validateToken} = 
require('../routes/auth/services/tokens.js')


/*
        Server functionalitys
*/
const resources_path = path.join(
    __dirname, "db.json"
)

function ServerPipeline(json_server) {
    const sv = json_server.create()
    
    const resources = json_server.router(resources_path)

    sv.use(json_server.defaults())
    
    sv.use(json_server.bodyParser)
    sv.use(cookieParser())
 
    setAuthRoutes(sv, resources)
    setUserRoutes(sv, resources)
    
    sv.use(resources)
    
    return sv
}

function cleanExpiredRefreshTokens(json_server) {
    setInterval(() => {
        const resources = json_server.router(resources_path)
        const refresh_tokens = 
        resources.db.getState().refresh_tokens

        for (const item of refresh_tokens){
            const valid_tk = validateToken(item.token, "auth_token")

            if (!valid_tk){
                resources.db.get("refresh_tokens")
                .remove({"token": item.token})
                .write()
            }
        }
    },
    1000 * 60 * 60)
}


module.exports = { 
    ServerPipeline, 
    cleanExpiredRefreshTokens 
}