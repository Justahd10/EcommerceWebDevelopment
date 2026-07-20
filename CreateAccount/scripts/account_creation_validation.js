// Simulação do recurso de usuários no banco
const users = [
    {
        "username": "Guadalupe.DuBuque",
        "fname": "Izabella",
        "lname": "Wintheiser",
        "email": "Viviane34@hotmail.com",
        "pass": "BA7d15V2_V8vlIF",
        "created_at": 1784138499,
        "status": "active",
        "id": "1"
    },
]

// Validar os formatos dos valores de email e senha
function check_values_formats(
    email, pass, confirm_pass, err_span
) {
    // Definir os formatos válidos de email e senha
    const pass_format = /^.{8,}$/
    const email_format =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Verificar se o email está correto
    if (!(email_format.test(email))) {
        err_span.textContent =
        "Insira um email válido"

        return false
    } else if (!(pass_format.test(pass))) {
        err_span.textContent =
        "Insira uma senha válida"

        return false
    } else if (!(confirm_pass === pass)) {
        err_span.textContent =
        "Senhas diferentes"

        return false
    }

    return true
}

// Validar se os valores já não existem no banco
function validate_credentials(
    email, pass, 
    datas, err_span
) {
    for (const user of datas) {
        if (
            user.email === email
        ) {
            err_span.textContent =
            "Email já registrado."
            return false
        }
    }

    err_span.textContent = ""
    return true
}

// Verificar o tipo de dado presente em cada campo
function check_fields_values(form) {
    let valid_values = true

    // Acessar o <span> de mensagem de erro
    const err_msg = document.getElementById("form-validation-msg")

    // Acessa os campos do formulário
    const name = form['name'].value
    const email = form['email'].value
    const pass = form['password'].value
    const confirm_pass = form['confirm_password'].value

    // Verificar se há algum campo vazio
    for (
        const field of [
            name, email,
            pass, confirm_pass
        ]
    ) {
        if (field === "") {
            err_msg.textContent =
            "Por favor, preencha todos os campos"
            valid_values = false
        }
    }

    // Verifica se o formato dos 
    // dados estão corretos
    if (valid_values) {
        valid_values = check_values_formats(
            email, pass, 
            confirm_pass, err_msg
        )
    }

    if (valid_values) {
        valid_values =
        validate_credentials(
            email, pass,
            users, err_msg
        )

    }

    console.log(valid_values)
}

document.addEventListener("DOMContentLoaded", () => {
    // Acessar o formulário de criação de conta
    const form = document.forms['CreateAccount']

    // Gatilho de evento para envio de formulário    
    document.getElementById(form.id)
    .addEventListener("submit", (event) => {
        event.preventDefault()

        const validated = check_fields_values(form)
        console.log(validated)
    })
})