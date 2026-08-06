import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/* Access scripts for component functionalitys */
import {submitUserCreds, checkEmail, checkPassord
} from './form_validation.js'

/* Child elements of the component */
import LoginFields from './fields'
import LoginButton from './login_button'

import './form.css'



// Component
function LoginForm({ pass_btn_mode }) {
    // State variables to credetials management
    const [usr_email, setEmail] = useState("")
    const [usr_pass, setPass] = useState("")
    const [remember_email, setRememberUsr] = useState(false)

    const [err_msg, setErrMsg] = useState("")

    // Lifting State Up function of the component
    function handleInputValue(event) {
        const target = event.target

        switch (target.name) {
            case "usr_email": setEmail(target.value); break
            case "usr_pass": setPass(target.value); break
            case "remember_me": setRememberUsr(target.checked); break
        }
    }

    function validateForm() {
        event.preventDefault()
        
        // Primary datas format validation
        if (
            checkEmail(usr_email, setErrMsg) &&
            checkPassord(usr_pass, setErrMsg)
        ) {
            // Verify in backend
            const valid_login = submitUserCreds()

        } else {
            
        }
    }

    return (
        <form className="login-form" name="LoginForm"
        onSubmit = {validateForm}>
            <LoginFields
                email_label="Email"
                pass_label="Senha"
                checkbox_msg="Mantenha-me conectado"
                msg={err_msg}
                pass_btn_mode={pass_btn_mode}
                input_func = {handleInputValue}/>
            <LoginButton primary />
        </form>
    )
}


LoginForm.propTypes = {}


export default LoginForm