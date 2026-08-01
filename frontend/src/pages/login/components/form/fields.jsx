import {Component} from 'react'
import PropTypes from 'prop-types'

/* Child elements for the component */
import PassVisibiltyButton from './pass_visibility_btn'

import './fields.css'



class LoginFields extends Component {
    render() {

        return (
            <div className = "fields-box">
                <div className = "creds-fields">
                    <label className = "field">
                        {this.props.email_label}
                        <input className = "input" name = "usr_name" type = "email"
                        placeholder = {this.props.email_placeholder}/>
                    </label>

                    <label className = "field">
                        {this.props.pass_label}
                        <div className = "pass-field">
                            <input className = "input" name = "usr_pass" type = "password"
                            placeholder = {this.props.pass_placeholder}/>
                            <PassVisibiltyButton mode = {this.props.pass_btn_mode}/>
                        </div>
                    </label>
                </div>

                <label className = "">
                    <div className = "checkbox-field">
                        <input name = "remember_me" type = "checkbox"/>
                        {this.props.checkbox_msg}
                    </div>
                </label>

                <span className = "notification-field">
                    {this.props.err_msg}
                </span>
            </div>
        )
    }
}


LoginFields.PropTypes = {
    email_label: PropTypes.string,
    pass_label: PropTypes.string,
    email_placeholder: PropTypes.string,
    pass_placeholder: PropTypes.string,
    checkbox_msg: PropTypes.string,
    err_msg: PropTypes.string,
    pass_btn_mode: PropTypes.oneOf(['show', 'hidde'])
}


export default LoginFields