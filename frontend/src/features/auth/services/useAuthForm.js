import * as z from "zod"



// Auxiliar function
function handleCallbackMsg(msgs_conf, status_code){
    // Default format for status code 200
    const callback_msg = {msg_class: "", msg: msgs_conf.success}

    switch (status_code){
        case 401:
            callback_msg.msg = msgs_conf.auth_error
            break;
        case 500: 
            callback_msg.msg = msgs_conf.auth_error
            break;
    }

    return callback_msg
}

const form_functionalitys = {
    "LoginPage": {
        "callback_function": (args) => {
            async function requestLogin(data) {
                const req_body = JSON.stringify({
                    "email": data.usr_email,
                    "password": data.usr_pass,
                    "remember_me": data.remember_me
                })

                try {
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

                    const status = await response.status
                    return handleCallbackMsg(args.msgs, status)

                } catch (e) {
                    return {
                        'msg_class': "",
                        "msg": args.msgs.connection_err
                    }
                }
            }

            return requestLogin
        },
        "validation_schema": (validations) => {
            return z.object(
                {
                    "usr_email": z.email({
                        error: validations.usr_email
                    }),
                    "usr_pass": z.string().min(8, 
                        {error: validations.usr_pass}),
                    "remember_me": z.boolean()
                }
            )
        }
    },
    "ResetPassEmailPage": {
        "callback_function": (args) => {
            async function sendPasswordResetEmail(datas){
                try {
                    await fetch(
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
                        msg_class: "",
                        msg: args.msgs.success,
                    }

                } catch (e){
                    return {
                        'msg_class': "",
                        "msg": args.msgs.connection_err
                    }
                }
            }

            return sendPasswordResetEmail
        },
        "validation_schema": (validations) => {
            return z.object(
                {
                    "usr_email": z.email({
                        error: validations.usr_email
                    })
                }
            )
        }
    },
    "ResetPassCodePage": {
        "callback_function": (args) => {
            async function sendNewPassword(datas){
                try {
                    const response = await fetch(
                        "http://localhost:3000/api/auth/pass_reset_confirm",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authentication": args.token
                            },
                            body: JSON.stringify(
                                {
                                    reset_code: datas.pass_reset_code,
                                    new_password: datas.usr_pass
                                }
                            )
                        }
                    )

                    // Tratar resultado
                    const status = await response.status
                    return handleCallbackMsg(args.msgs, status)

                } catch(e) {
                    return {
                        'msg_class': "",
                        "msg": args.msgs.connection_err
                    }
                }
            }

            return sendNewPassword
        },
        "validation_schema": (validations) => {
            return z.object(
                {
                    pass_reset_code: z.string().length(6, 
                    { error: validations.pass_reset_code }),
                    usr_pass: z.string().min(8, 
                    { error: validations.usr_pass }),
                    usr_pass_confirm: z.string().min(8, 
                    { error: validations.usr_pass })
                }
            ).refine(
                (val) => val.usr_pass === val.usr_pass_confirm,
                { 
                    error: validations.usr_pass_confirm, 
                    path: ["usr_pass_confirm"]
                 }
            )
        }
    }
}


export default function useAuthForm(
    page, args, validations 
){
    return {
        "callback_func": form_functionalitys[page]
        .callback_function(args),
        "schema": form_functionalitys[page]
        .validation_schema(validations)
    }
}
