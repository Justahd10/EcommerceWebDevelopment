// Regex values for datas format validaiton
const email_r =
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const pass_r = /^.{8,}$/

const empty_fields_msg = "Preencha todos os campos"


/* 
        Functions to validate values of the login form
*/
export async function getAuth(email, pass, remember_me, setErr) {
    const req_body = JSON.stringify({
        "email": email,
        "password": pass,
        "remember_me": remember_me
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
    
    if (status === 200) {
        setErr("")
        return true
    } 
    else {
        setErr("Conta não encontrada")
        return false
    }
}

export function checkEmail(email, setErr) {
    if (email === "") {
        setErr(empty_fields_msg)
        return false
    } else if (!email_r.test(email)) {
        setErr("Insira um email válido")
        return false
    }

    return true
}

export function checkPassord(pass, setErr) {
    if (pass === "") {
        setErr(empty_fields_msg)
        return false
    } else if (!pass_r.test(pass)) {
        setErr("Insria uma senha válida")
        return false
    }

    return true
}