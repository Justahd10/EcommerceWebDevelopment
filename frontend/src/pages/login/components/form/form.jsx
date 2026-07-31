import {Component} from 'react'
import PropTypes from 'prop-types'

/* Child elements of the component */
import LoginFields from './fields'
import LoginButton from './login_button'

import './form.css'



class LoginForm extends Component {
    render() {
        return (
            <form className = "" name = "LoginForm">
                <LoginFields/>
                <LoginButton/>
            </form>
        )
    }
}

LoginForm.PropTypes = {}


export default LoginForm