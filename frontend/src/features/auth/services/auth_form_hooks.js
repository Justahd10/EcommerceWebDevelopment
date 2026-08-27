import { useState } from "react";
import requestApi from "../../../shared/services/requestApi";
import * as z from "zod"



const schemas = {
    "usr_email": (validators) => z.email({
        error: validators.usr_email
    }),
    "usr_pass": (validators) => z.string().min(8, {
        error: validators.usr_pass
    }),
    "usr_pass_confirm": (validators) => z.string().min(8, {
        error: validators.usr_pass
    }),
    "pass_reset_code": (validators) => z.string().length(6, {
            error: validators.pass_reset_code
    }),
    "remember_me": () => z.boolean()
}

function buildSchema(validators){
    let validations = {}

    for (const field of Object.keys(validators)){
        validations[field] = schemas[field](validators)
    }
    const schema = z.object(validations)

    if (
        Object.keys(validations).includes("usr_pass_confirm")
    ){
        schema.refine((val) => 
            val.usr_pass === val.usr_pass_confirm, 
        {
            error: validators.usr_pass_confirm, 
            path: ["usr_pass_confirm"]
        })
    }

    return schema
}

const form_functionalitys = {
    "LoginPage": {
        "callback_function": (extra_args) => {

            async function callback_func(data){
                const result = await requestApi("/auth/login", {
                    body: {
                        'email': data.usr_email,
                        'password': data.usr_pass,
                        'remember_me': data.remember_me
                    }
                })

                if (!result.error && result.code === 200){

                    // Update user authentication state context
                    extra_args.toogleUserSession({
                        'has_auth': true,
                        'user_datas': {
                            'has_auth': true,
                            'user_datas': {
                                'email': result.payload.data.email,
                                'id': result.payload.data.id
                            }
                        }
                    })
                }

                return result.msg_conf
            }

            return callback_func
        },
        "validation_schema": (validations) => buildSchema(validations)
    },
    "ResetPassEmailPage": {
        "callback_function": () => {
            
            async function callback_func(data){
                const result = await requestApi("/auth/pass_reset_request", {
                    body: {
                        "email": data.usr_email,
                    }
                })

                return result.msg_conf
            }

            return callback_func
        },
        "validation_schema": (validations) => buildSchema(validations)
    },
    "ResetPassCodePage": {
        "callback_function": (extra_args) => {

            async function callback_func(data){
                const result = await requestApi("/auth/pass_reset_confirm", {
                    body: {
                        'reset_code': data.pass_reset_code,
                        'new_password': data.usr_pass
                    },
                    headers: {
                        "Authentication": extra_args.token
                    }
                })

                return result.msg_conf
            }

            return callback_func
        },
        "validation_schema": (validations) => buildSchema(validations)
    },
    "CreateAccountPage": {
        "callback_function": (extra_args) => {

            async function callback_func(data){
                const result = await requestApi("/users/register", {
                    body: {
                        'email': data.usr_email,
                        'password': data.usr_pass,
                        'remember_me': data.remember_me
                    }
                })

                if (!result.payload.error && result.code === 200){
                    extra_args.toogleUserSession({
                        'has_auth': true,
                        'user_datas': {
                            'has_auth': true,
                            'user_datas': {
                                'email': result.payload.data.email,
                                'id': result.payload.data.id
                            }
                        }
                    })
                }

                return result.msg_conf
            }

            return callback_func
        },
        "validation_schema": (validations) => buildSchema(validations)
    }
}


export function useAuthForm(page, extra_args, validations){
    return {
        "callback_func": form_functionalitys[page]
        .callback_function(extra_args),
        "schema": form_functionalitys[page]
        .validation_schema(validations)
    }
}

export function usePassFieldState(){
    const [is_pass_visible, setIsPassVisible] = useState(false)

    function tooglePassVisibility(){
        setIsPassVisible(is_pass_visible?false:true)
    }

    return { is_pass_visible, tooglePassVisibility }
}