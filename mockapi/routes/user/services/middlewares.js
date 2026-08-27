const { doDbQuery } = require('../../helpers')



/*
        Auxiliar functions
*/
function generateUserId(){
    const ts = new Date().toISOString()
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    let random = ""
    
    for (const num of nums){
        random = random + 
        nums[Math.floor(Math.random() * nums.length)]
    }

    return `user-${ts}-${random}`
}

/* 
        Endpoints: /api/auth/login, /api/users/register
        
*/
function getUser(resource, creds) {
    return (req, res, next) => {
        req.locals = req.locals ??  {}

        const filter = {}
        for (const cred of creds){
            filter[cred] = req.body[cred]
            req.locals[cred] = req.body[cred]
        }

        req.locals.user_datas = 
        doDbQuery(resource, "users", "get", filter).data

        next()
    }
}

/*
        Endpoints: /api/users/register
*/
function createUser(resource){
    return (req, res, next) => {

        req.locals = req.locals ?? {}
        const usr_id = generateUserId()
        req.locals.usr_id = usr_id

        doDbQuery(resource, "users", "push", {
            "id": usr_id,
            "email": req.body.email,
            "password": req.body.password
        })

        next()
    }
}


module.exports = { getUser, createUser }