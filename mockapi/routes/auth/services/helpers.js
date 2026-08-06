function generateToken(type, id, email) {
    const create_at = new Date(Date.now()).toISOString()

    let mins = type === "auth" ? 15 : 60

    const expires =
    new Date(Date.now() + (mins * 60 * 1000)).toISOString()

    return {
        "token": `${id} ${email} ${create_at} ${expires}`,
        "create_at": create_at,
        "expires": expires
    }
}

function checkToken(token) {
    const expires = token.split(" ")[3]

    if (new Date(expires) > new Date(Date.now())){
        return true
    }

    return false
}



module.exports = {generateToken, checkToken}