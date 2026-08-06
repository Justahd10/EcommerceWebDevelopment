const path = require('path')

const setAuthRoutes = require('../routes/auth/auth.js')


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

    setAuthRoutes(sv, resources)

    sv.use(resources)
    
    return sv
}

function cleanExpiredRefreshTokens(json_server) {
    setInterval(() => {
        const resources = json_server.router(resources_path)
        const refresh_tokens = 
        resources.db.getState().refresh_tokens

        for (const item of refresh_tokens){
            const valid_tk = checkToken(item.token)

            if (!valid_tk){
                deleted_tokens.push(item.token)
                resources.db.get("refresh_tokens")
                .remove({"token": item.token})
                .write()
            }
        }
    },
    1000 * 60 * 60)
}


module.exports = { ServerPipeline, cleanExpiredRefreshTokens }