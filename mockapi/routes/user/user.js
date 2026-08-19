const {getUserDatas} = require("./services/middlewares.js")
const {verifyAccessToken} = require("../auth/services/session.js")



function setUserRoutes(server, resources) {
    
    server.get("/api/profile", 
        verifyAccessToken, getUserDatas(resources),
        (req, res, next) => {
            const usr_datas = req.locals.usr_datas
            
            res.status(200)

            if (req.locals.usr_datas){
                res.json(
                    {
                        "status": "success",
                        "user": {
                            "email": usr_datas.email,
                            "password": usr_datas.senha
                        }
                    }
                )
            } else {
                res.json(
                    {
                        "status": "success",
                        "datas": {}
                    }
                )
            }
    })
}

module.exports = setUserRoutes