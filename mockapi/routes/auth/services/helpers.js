function createAuth(type, id, email) {
    const exp_time = type === "access_token" ? 15 : 60

    const create_at = new Date(Date.now()).toISOString()
    const expires = new Date(Date.now() + (exp_time * 60 * 1000))

    return {
        "token": `${type} ${id} ${email} ${create_at} ${expires
            .toISOString()
        }`,
        "create_at": create_at, 
        "expires": expires
    }
}

function checkToken(token) {
    const expires = token.split(" ")[4]

    if (new Date(expires) > new Date(Date.now())){
        return true
    }

    return false
}


module.exports = {createAuth, checkToken}