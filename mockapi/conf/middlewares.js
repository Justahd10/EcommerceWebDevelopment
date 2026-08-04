function myMiddleware(req, res, next){
    res.header("X-Hello", "World")
    next()
}

module.exports = myMiddleware