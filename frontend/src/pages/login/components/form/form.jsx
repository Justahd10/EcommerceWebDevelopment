import {Component} from 'react'
import PropTypes from 'prop-types'

/* Child elements of the component */
import LoginFields from './fields'
import LoginButton from './login_button'

import './form.css'



class LoginForm extends Component {
    render() {
        return (
            <form className = "login-form" name = "LoginForm">
                <LoginFields email_label = "Email" pass_label = "Senha"
                checkbox_msg = "Mantenha-me conectado"
                err_msg = {this.props.err_msg}
                pass_btn_mode = {this.props.pass_btn_mode}/>
                <LoginButton primary/>
            </form>
        )
    }
}

LoginForm.PropTypes = {
    err_msg: PropTypes.string,
    pass_btn_mode: PropTypes.oneOf(['show', 'hidde'])
}


export default LoginForm