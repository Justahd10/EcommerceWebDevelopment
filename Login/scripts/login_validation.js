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
    {
        "username": "Jailyn33",
        "fname": "Alfreda",
        "lname": "Prosacco",
        "email": "Ettie_Ledner19@hotmail.com",
        "pass": "zqEjAJdhpGr3L1b",
        "created_at": 1784138439,
        "status": "active",
        "id": "2"
    },
]

// Acessa o seação de login
const login_section = document.getElementById("login-section")
// Acessa o formulário de login
const login_form = document.getElementById("login-form")
// Acessa o <span> para mensagens de erro
const login_err_msg = document.getElementById("form-validation-msg")


// Funções para validação de formulário
function get_users() {
    return users
}

// Procurar as credenciais nos usuários registrados no banco
function check_usr_credentials(email, password, datas) {
    for (const data of datas) {
        console.log(data.email, data.pass)
        if (
            data.email === email
            &&
            data.pass === password
        ) {
            login_err_msg.textContent = ""

            return true
        }
    }

    login_err_msg.textContent =
    "Cadastro não encontrado"

    return false
}

// Validar os formatos dos valores de email e senha
function check_values_format(email, password) {
    const pass_format = /^.{8,}$/
    const email_format =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!(email_format.test(email))) {
        login_err_msg.textContent =
        "Insira um email válido"
        return false
    } else if (!(pass_format.test(password))) {
        login_err_msg.textContent =
        "Insira uma senha válida"
        return false
    }

    return true
}


// Adiciona evento para envio de login
login_section.addEventListener("submit", (event) => {
    event.preventDefault()

    // Acessa os valores dos campos
    const login_form =
    document.forms['LoginForm']

    const email = login_form['user_email'].value
    const pass = login_form['user_pass'].value

    // Consulta os usuários no banco
    const users_datas = get_users()

    const valid_formats =
    check_values_format(email, pass)

    if (valid_formats) {
        const valid_credentials =
        check_usr_credentials(
            email, pass, users_datas
        )

        if (valid_credentials) {
            console.log("usuário encontrado!")
        } else {
            console.log("usuário não encontrado.")
        }
    }
})