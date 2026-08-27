import apiConfig from "./api_config.json" with {type: 'json'}



/*
        Auxiliar functions
*/
function handleResponse(resp_config, code){
    for (
        const [key, value] of 
        Object.entries(resp_config)
    ){
        if (value.code === code){
            return {
                "msg": value.message,
                "msg_class": value.msg_class
            }
        }
    }
}

function appendParams(default_params, new_params){
    for (
        const [param, value] of 
        Object.entries(new_params)
    ){
        default_params[param] = {
            ...default_params[param],
            ...value
        }
    }
    
    if (default_params.body){
        default_params.body = 
        JSON.stringify(default_params.body)
    }
}

async function requestApi(endpoint, values = null){
    let url = apiConfig.base_url
    let params = apiConfig.endpoints
    let resps = apiConfig.responses
    const exception_res = resps.connection_err

    url = url + endpoint.split("/").join("/")

    for (const item of endpoint.split("/").slice(1)){
        params = params[`/${item}`]
        resps = resps[`/${item}`]
    }

    if (values){appendParams(params.default, values)}

    try {
        const response = await fetch(url, params.default)
        const status = await response.status
        const data = await response.json()

        return {
            'code': status, 
            'payload': data,
            'msg_conf': handleResponse(resps, status)
        }

    } catch (e){
        return {
            'code': null, 
            'payload': {},
            'msg_conf': {
                "msg_class": exception_res.msg_class,
                "msg": exception_res.message,
            }
        }
    }
}


export default requestApi