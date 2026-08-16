// on submit functions of each form type
import { checkEmail, checkPassword, getAuth } 
from "../../login/services/form_validation"



const form_functionalitys = {
    "login": {
        "default_values": {
            "usr_email": "",
            "usr_pass": "",
            "remember_me": false
        },
        "callback_func": getAuth,
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
    "reset_password1": {
        "submit_func": null,
    },
    "reset_password2": {
        "submit_func": null,
    }
}


export default form_functionalitys