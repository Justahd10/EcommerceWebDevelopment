import * as z from "zod"

const form_functionalitys = {
    "LoginPage": {
        "callback_function": (args) => {
            async function requestLogin(data) {
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

                const status = await response.status
                
                if (status !== 200) {
                    return {
                        msg_class: "",
                        msg: args.msgs.error
                    }
                }

                return {
                    msg_class: "",
                    msg: args.msgs.success
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
                    msg_class: "",
                    msg: args.msgs.success,
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

                if (status !== 200){
                    return {
                        msg_class: "",
                        msg: args.msgs.error,
                    }
                } else {
                    return {
                        msg_class: "",
                        msg: args.msgs.success,
                    }
                }
            }

            return sendNewPassword
        },
        "validation_schema": (validations) => {
            return z.object(
                {
                    pass_reset_code: z.string().length(6, 
                    { error: validations.pass_reset_code}),
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
        "callback_func":
        form_functionalitys[page]
        .callback_function(args),
        "schema": 
        form_functionalitys[page]
        .validation_schema(validations)
    }
}