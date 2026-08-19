/*
        Form callback functions
*/
let msg =
"Caso email informado esteja registrado você receberá uma notificação para redefiniação de senha"

export async function sendPasswordResetEmail(datas){
    fetch(
        "http://localhost:3000/api/auth/pass_reset_request",
        {
            method: "POST",
            body: JSON.stringify({"email": datas.usr_email}),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    // Defualt callback
    return {
        "msg": msg,
        "type": "success"
    }
}

export async function getPassResetAuth(token, setAccess){
    const response = await fetch(
        "http://localhost:3000/api/auth/pass_reset_validate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authentication": token
            }
        }
    )

    const status_code = await response.status

    if (status_code === 200){
        setAccess(true)
    } else {setAccess(false)}
}

export async function sendNewPassword(){
    // Fazer requisição


    // Tratar resultado
}