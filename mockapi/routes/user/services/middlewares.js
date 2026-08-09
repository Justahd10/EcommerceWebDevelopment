function getUserDatas(resources){
    return (req, res, next) => {
        const user = resources.db.get("users")
        .find({"id": req.locals.usr_id}).value()

        req.locals.usr_datas = user

        next()
    }
}


module.exports = {getUserDatas}