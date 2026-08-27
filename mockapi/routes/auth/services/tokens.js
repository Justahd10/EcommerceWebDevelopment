/*
        Creation functions
*/
function createResetPassToken(){
    let tk = ""
    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
    
    while (tk.length !== 64){
        const choose =
        chars[Math.floor(Math.random() * chars.length)]
        tk = tk + choose
    }

    return {
        "token": tk,
        "create_at": new Date(Date.now()).toISOString(),
        "expires": new Date(Date.now() + (30 * 60 * 1000)),
    }
}

function createAuthToken(type, datas){
    const mins = type === "access_token" ? 15 : 60

    const create_at = new Date(Date.now()).toISOString()
    const expires = new Date(Date.now() + (mins * 60 * 1000))
    const tk = 
    `${type} ${datas.id} ${datas.email} ${create_at} ${expires.toISOString()}`

    return {
        "token": tk,
        "create_at": create_at, 
        "expires": expires
    }
}

/*
        Validation functions
*/
// Auxiliar function
function getTokenDatas(tk, resource){
    const tk_type = 
    tk.includes("refresh_token") ?
    "refresh_tokens" : "pass_reset_tokens"

    const token = resource.db.get(tk_type)
    .find({"token": tk}).value()

    return token
}

function validateAuthToken(tk, resource){
    // Validate access token
    if (
        tk.includes("access_token") &&
        !(new Date(tk.split(" ")[4]
        ) > new Date(Date.now()))
    ){ return false }

    const tk_datas = getTokenDatas(tk, resource)

    // Validate refresh token
    if (
        !tk_datas ||
        !(new Date(tk_datas.expires
        )) > new Date(Date.now())
    ){ return false }

    return true
}

function validatePassResetToken(tk, resource){
    const tk_datas = 
    getTokenDatas(tk, resource)

    if (
        !tk_datas ||
        !(new Date(tk_datas.expires
        )) > new Date(Date.now())
    ){
        return false
    }

    return true
}

const token_conf = {
    "pass_reset_token": {
        "create_func": createResetPassToken,
        "validator": validatePassResetToken
    },
    "auth_token": {
        "create_func": createAuthToken,
        "validator": validateAuthToken
    }
}


function generateToken(format, datas = null){
    const { type } = format
    const create_tk = token_conf[type].create_func
    
    if (datas){
        const { name } = format
        return create_tk(name, datas)
    }
    else {return create_tk()}
}


function validateToken(token, type, resource = null){
    const valid = 
    token_conf[type].validator(token, resource)

    return valid
}


module.exports = {generateToken, validateToken}