// Regex values for datas format validaiton
const email_r =
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const pass_r = /^.{8,}$/

const empty_fields_msg = "Preencha todos os campos"

/*
        Fields validators
*/
export function checkEmail(email) {

    const validation_result = 
    (email === "" || !email_r.test(email)) ?
    "Insira um formato de email válido" : true

    return validation_result
}

export function checkPassword(pass) {
    const validation_result = 
    (pass === "" || !pass_r.test(pass)) ?
    "Senha deverá conter no mínimo 8 caracteres" : true

    return validation_result
}