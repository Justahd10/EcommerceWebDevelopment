import {Component} from 'react'
import PropTypes from 'prop-types'

import './social_login_button.css'



class SocialLoginButton extends Component {
    render() {
        return (
            <button className = "social-login-button" type = "button">
                <img className = "social-login-icon" src = {this.props.icon_url}/>
                <span className = "button-text">
                    {this.props.text}
                </span>
            </button>
        )
    }
}


SocialLoginButton.PropTypes = {
    icon_url: PropTypes.string,
    text: PropTypes.string
}


export default SocialLoginButton
