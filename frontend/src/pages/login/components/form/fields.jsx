import {Component} from 'react'
import PropTypes from 'prop-types'

/* Child elements for the component */
import PassVisibiltyButton from './pass_visibility_btn'

import './fields.css'



class LoginFields extends Component {
    render() {

        return (
            <div className = "">
                <label className = "">
                    {this.props.email_label}
                    <input className = "input" name = "usr_name" type = "email"
                    placeholder = {this.props.email_placeholder}/>
                </label>

                <label className = "">
                    {this.props.pass_label}
                    <div className = "">
                        <input className = "input" name = "usr_pass" type = "password"
                        placeholder = {this.props.pass_placeholder}/>
                        <PassVisibiltyButton/>
                    </div>
                </label>

                <label className = "">
                    <div className = "">
                        <input name = "remember_me" type = "checkbox"/>
                        {this.props.checkbox_msg}
                    </div>
                </label>

                <span className = "">
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
    err_msg: PropTypes.string
}


export default LoginFields