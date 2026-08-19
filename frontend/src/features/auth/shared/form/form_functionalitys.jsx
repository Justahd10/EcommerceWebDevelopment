// on submit functions of each form type
import { requestLogin } from "../../request_login.js"
import { checkEmail, checkPassword, checkPassConfirm } 
from "../services/fields_validators.js"

import { 
    sendNewPassword, sendPasswordResetEmail
 } from "../../password_reset.js"



const form_functionalitys = {
    "login": {
        "default_values": {
            "usr_email": "",
            "usr_pass": "",
            "remember_me": false
        },
        "callback_func": requestLogin,
        "reset_callback": true,
        "validators": {
            "usr_email": checkEmail,
            "usr_pass": checkPassword,
            "usr_pass_confirm": checkPassword
        }
    },
    "create_account": {
        "submit_func": null,
    },
    "reset_password_email": {
        "default_values": {
            "usr_email": ""
        },
        "callback_func": sendPasswordResetEmail,
        "reset_callback": true,
        "validators": {
            "usr_email": checkEmail
        }
    },
    "reset_password_code": {
        "default_values": {
            "pass_reset_code": "",
            "usr_pass": "",
            "usr_pass_confirm": ""
        },
        "callback_func": null,
        "reset_callback": true,
        "validators": {
            "pass_reset_code": checkPassConfirm,
            "usr_pass": checkPassword
        }
    }
}


export default form_functionalitys