require("dotenv").config();

const { generateToken, validateToken } = 
require("./tokens")
const nodemailer = require("nodemailer")

const smtp_pass = process.env.SMTP_PASS
const smtp_user = process.env.SMTP_USER
let email_msg = process.env.email_msg

// Gmail transporter
const tranporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: smtp_user,
            pass: smtp_pass
        }
    }
)

// Auxiliar function to send email message
function sendEmailMsg(
    to, subject, html_body
){
    try {
        tranporter.sendMail(
            {
                from: smtp_user,
                to: to,
                subject: subject,
                html: html_body
            }
        )
    } catch {
        return false
    }

    return true
}

// Auxiliar function to generate reset code
function generateCode(){
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    let code = ""
    while (code.length !== 6){
        code = code + 
        `${nums[Math.floor(Math.random() * nums.length)]}`
    }

    return code
}

// Auxiliar function to generate redirect link
function generateLink(token){
    return `http://localhost:5173/redefinir-senha/${token}`
}

// Auxiliar function to register token in database
function storageToken(datas, resource){
    const collection = 
    resource.db.get("pass_reset_tokens")

    const existing_record = 
    collection.find({user_id: datas.user_id})

    if (!existing_record.value()){
        collection.push(datas).write()
    } else {
        existing_record.assign(datas).write()
    }
}

function registerResetPassToken(resource){
    return (req, res, next) => {
        const tk_datas = generateToken("reset_pass_token")
        req.locals.token = tk_datas.token

        req.locals.tk_datas = {
                "user_id": req.locals.usr_id,
                "token": tk_datas.token,
                "create_at": tk_datas.create_at,
                "expires": tk_datas.expires
            }

        next()
    }
}

function sendPassResetEmail(resource){
    return (req, res, next) => {
        req.locals = req.locals ?? {}

        const code = generateCode()

        req.locals.tk_datas.code = code
        storageToken(req.locals.tk_datas, resource)

        if (sendEmailMsg(
            req.body.email,
            "Redefinição de senha",
            (email_msg.replace("{code}", code))
            .replace("{link}", 
                generateLink(req.locals.token))
        )){

        }

        next()
    }
}

function validateResetToken(resource){
    return (req, res, next) => {
        req.locals = req.locals ?? {}

        const reset_tk = req.header("Authentication")

        req.locals.valid_reset_tk =
        validateToken(
            reset_tk, "reset_pass_token", resource
        )

        next()
    }
}

function resetPassword(resource){
    return (req, res, next) => {
        req.locals = req.locals ?? {}

        // Consulta do token


        // Validação


            // Atualização de senha
    }
}


module.exports = { 
    registerResetPassToken, sendPassResetEmail,
    validateResetToken
}