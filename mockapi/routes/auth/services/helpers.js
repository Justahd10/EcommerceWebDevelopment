/*
        Creation functions
*/
function createResetPassToken(){
    let tk = ""
    const chars = [
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N",
        "O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b",
        "c","d","e","f","g","h","i","j","k","l","m","n","o","p",
        "q","r","s","t","u","v","w","x","y","z","0","1","2","3",
        "4","5","6","7","8","9","!","?",".",",",";",":","'","\"",
        "-","_","+","=","%","<",">","(",")","[","]","{","}","@",
        "#","$","&","|","^","~","\\","´","`"," "
    ]
    
    while (tk.length !== 64){
        const choose = 
        chars[Math.floor(Math.random() * chars.length + 1)]
        tk = tk + choose
    }

    return {
        "token": tk,
        "create_at": new Date(Date.now()).toISOString(),
        "expires": new Date(Date.now() + (30 * 60 * 1000)),
    }
}

function createAuthToken(type, id, email){
    const exp_time = type === "access_token" ? 15 : 60

    const create_at = new Date(Date.now()).toISOString()
    const expires = new Date(Date.now() + (exp_time * 60 * 1000))
    const tk = 
    `${type} ${id} ${email} ${create_at} ${expires.toISOString()}`

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
    "refresh_token" : "pass_reset_token"

    const token = resource.db.get(tk_type)
    .find({"token": token}).value()

    return token
}

function validateAuthToken(tk, resource){
    // Validate access token
    if (
        tk.includes("access_token") &&
        !(new Date(token.split(" ")[4]
        ) > new Date(Date.now()))
    ){
        return false
    } 

    const tk_datas = 
    getTokenDatas(tk, resource)

    // Validate refresh token
    if (
        !tk_datas ||
        !(new Date(tk_datas.expires
        )) > new Date(Date.now())
    ){
        return false
    }

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
    "reset_pass_token": {
        "create_func": createResetPassToken,
        "validator": validatePassResetToken
    },
    "auth_token": {
        "create_func": createAuthToken,
        "validator": validateAuthToken
    }
}


function generateToken(type, datas = null){
    const create_tk = token_conf[type].create_func
    
    if (datas){return create_tk(datas)}
    else {return create_tk()}
}


function validateToken(token, type, resource = null){
    const valid = 
    token_conf[type].validator(token, resource)

    return valid
}


module.exports = {generateToken, validateToken}