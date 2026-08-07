const json_server = require('json-server')
const {ServerPipeline, cleanExpiredRefreshTokens} = require("./conf/sv.js")

const sv = ServerPipeline(json_server) // Server build

function Main(){
    sv.listen(3000, () => {
        console.log("JSON server is running...")
    })
}

Main() // Start the server

cleanExpiredRefreshTokens(json_server) // Token register verification process