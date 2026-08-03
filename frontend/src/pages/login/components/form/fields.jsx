import { useState } from 'react'
import PropTypes from 'prop-types'

/* Child elements for the component */
import PassVisibiltyButton from './pass_visibility_btn'

import './fields.css'



function LoginFields({
    email_label, pass_label,
    email_placeholder, pass_placeholder,
    checkbox_msg, msg,
    pass_btn_mode, input_func
}) {
    // Alter pass visibility funcitonality
    const [show_pass, setPassVisibility] = useState(false)
    
    function tooglePassVisibility() {
        if (!show_pass) {
            setPassVisibility(true)
        } else {
            setPassVisibility(false)
        }
    }

    const pass_state = show_pass ? 
    ["text", "hidde"] : ["password", "show"]

    return (
        <div className="fields-box">
            <div className="creds-fields">
                <label className="field">
                    {email_label}
                    <input onChange = {input_func}
                        className="input"
                        name="usr_email"
                        type="email"
                        placeholder={email_placeholder}
                    />
                </label>

                <label className="field">
                    {pass_label}
                    <div className="pass-field">
                        <input onChange = {input_func} 
                            className="input"
                            name="usr_pass"
                            type={pass_state[0]}
                            placeholder={pass_placeholder}
                        />
                        <PassVisibiltyButton 
                        click_func = {tooglePassVisibility}
                        mode = {pass_state[1]}/>
                    </div>
                </label>
            </div>

            <label className="">
                <div className="checkbox-field">
                    <input name="remember_me" type="checkbox" />
                    {checkbox_msg}
                </div>
            </label>

            <span className="notification-field">
                {msg}
            </span>
        </div>
    )
}

LoginFields.propTypes = {
    email_label: PropTypes.string,
    pass_label: PropTypes.string,
    email_placeholder: PropTypes.string,
    pass_placeholder: PropTypes.string,
    checkbox_msg: PropTypes.string,
    msg: PropTypes.string
}


export default LoginFields