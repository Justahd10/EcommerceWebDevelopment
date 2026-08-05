const ServerPipeline = require("./conf/sv.js")

const app = ServerPipeline()


function Main(){
    app.listen(3000, () => {
        console.log("JSON server is running...")
    })
}