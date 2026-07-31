import {Component} from 'react'
import PropTypes from 'prop-types'

import './fields.css'


class LoginFields extends Component {
    render() {

        return (
            <div className = "login-fields">
                <label className = "field">
                    {this.props.email_label}
                    <input name = "usr_name" type = "email"
                    placeholder = {
                        this.props.email_placeholder
                    }/>
                </label>

                <label className = "field">
                    {this.props.pass_label}
                    <div className = "pass-field">
                        <input name = "usr_pass" type = "password"
                        placeholder = {
                            this.props.pass_placeholder
                        }/>
                        <img src = {this.props.visibility_img}/>
                    </div>
                </label>
            </div>
        )
    }
}


LoginFields.PropTypes = {
    email_label: PropTypes.string,
    pass_label: PropTypes.string,
    email_placeholder: PropTypes.string,
    pass_placeholder: PropTypes.string,
    visibility_img: PropTypes.string
}


export default LoginFields