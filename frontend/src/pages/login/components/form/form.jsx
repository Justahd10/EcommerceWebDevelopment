import { useState } from 'react'
import PropTypes from 'prop-types'

/* Access scripts for component functionalitys */
import {getAuth, checkEmail, checkPassord
} from './form_validation.js'

/* Child elements of the component */
import LoginFields from './fields'
import LoginButton from './login_button'

import './form.css'



function LoginForm({ pass_btn_mode }) {
    // State variables to credetials management
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [remember_me, setRememberUsr] = useState(false)

    const [err_msg, setErrMsg] = useState("")

    // Lifting State Up function of the component
    function handleInputValue(event) {
        const target = event.target

        switch (target.name) {
            case "usr_email": 
                setEmail(target.value); break
            case "usr_pass": 
                setPass(target.value); break
            case "remember_me": 
                setRememberUsr(target.checked); break
        }
    }

    async function validateForm() {
        event.preventDefault()
        
        // Primary datas format validation
        if (
            checkEmail(email, setErrMsg) &&
            checkPassord(password, setErrMsg)
        ) {
            // Verify in backend
            if (await getAuth(
                email, password, remember_me, setErrMsg
            )) {

            }
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