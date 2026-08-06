// Regex values for datas format validaiton
const email_r =
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const pass_r = /^.{8,}$/

const empty_fields_msg = "Preencha todos os campos"


// Functions to validate values of the login form
export async function submitUserCreds(email, pass, setErr) {
    const url =
    `http://localhost:3000/users?email=${email}`

    const response = await fetch(url)
    const datas = await response.json()

    if (
        datas.length == 1 &&
        datas[0]['email'] === email &&
        datas[0]['senha'] === pass
    ) {
        setErr("")
        return true
    }
    
    setErr("Conta não encontrada")
    return false
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