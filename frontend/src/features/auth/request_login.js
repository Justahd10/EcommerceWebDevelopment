/* 
        Submit callback functions
*/
// 1. Login
export async function requestLogin(data) {
    const req_body = JSON.stringify({
        "email": data.usr_email,
        "password": data.usr_pass,
        "remember_me": data.remember_me
    })

    const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
            "method": "POST",
            "body": req_body,
            "headers": {
                "Content-type": "application/json",
            },
            "credentials": "include"
        }
    )

    const datas = await response.json()
    const status = await response.status
    
    if (status !== 200) {
        return {
            msg_class: "",
            msg: "Email ou senha inválidos"
        }
    }

    return {
        msg_class: "",
        msg: ""
    }
}
