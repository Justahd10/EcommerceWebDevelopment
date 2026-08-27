function doDbQuery(routers, name, query, datas){
    const q_result = {
        "success": true,
        "error": null,
        "data": null
    }
    const resource = routers.db.get(name)

    try {
        switch (query){
            case "get":
                q_result.data = resource.find(datas).value()
                break;

            case "push":
                resource.push(datas).write()
                break;

            case "update":
                resource.find(datas.find)
                .assign(datas.update).write()
                break;
        }
    } catch(e) {
        q_result.success = false
        q_result.error = e
    }

    return q_result
}

// Used for all api routes
function sendResponse(
    res, httpCode, status, error, data
){
    return res.status(httpCode).json({
        'status': status,
        'error': error,
        'data': data
    })
}


module.exports = { doDbQuery, sendResponse }