const ServerPipeline = require("./conf/sv.js")

const sv = ServerPipeline()


function Main(){
    sv.listen(3000, () => {
        console.log("JSON server is running...")
    })
}

Main()