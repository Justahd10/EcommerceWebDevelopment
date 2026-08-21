require("dotenv").config();

const { doDbQuery } = require("../../helpers.js")

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
    }W
}

function registerResetPassToken(resource){
    return (req, res, next) => {
        const tk_datas = generateToken("pass_reset_token")
        req.locals.token = tk_datas.token

        req.locals.tk_datas = {
                "user_id": req.locals.usr_id,
                "token": tk_datas.token,
                "create_at": tk_datas.create_at,
                "expires": tk_datas.expires
            }

        doDbQuery(
            resource, "pass_reset_tokens", 
            "get", req.locals.tk_datas
        )

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
            reset_tk, "pass_reset_token", resource
        )

        next()
    }
}

// /api/auth/pass_resetword_confirm
function resetPassword(resource){
    return (req, res, next) => {
        req.locals = req.locals ?? {}

        let q = doDbQuery(
            resource, "pass_reset_tokens",
            "get", {code: req.body.reset_code}
        )

        req.locals.valid_request = false

        if (
            // Check reset code
            (q.success && q.data) &&
            // Check reset token
            (
                q.data.token === req.header("Authentication") &&
                validateToken(
                    q.data.token, "pass_reset_token", resource
                )
            )
        ) {
            req.locals.valid_request = true
        }

        if (req.locals.valid_request){
            q = doDbQuery(
                resource, "users", "update",
                { "find": {
                    id: q.data.user_id
                }, "update": {
                    password: req.body.new_password
                }}
            )
        }

        if (q.error){
            return res.sendStatus(500)
        }
        
        next()
    }
}


module.exports = { 
    registerResetPassToken, sendPassResetEmail,
    validateResetToken, resetPassword
}