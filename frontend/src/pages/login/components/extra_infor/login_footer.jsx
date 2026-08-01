import {Component} from 'react'
import PropTypes from 'prop-types'

/* Child elements of the component*/
import SignUpDividerBar from './signup_divider'
import SocialLoginButton from './social_login_button'

/* Buttons images */
import googleImg from '../../assets/google_icon.png'
import facebookImg from '../../assets/facebook_icon.png'

import './login_footer.css'



const social_logins = [
    {
        "icon": googleImg,
        "text": "Google"
    },
    {
        "icon": facebookImg,
        "text": "Facebook"
    }
]

function setSocialLogins() {
    const buttons = []

    for (const item of social_logins) {
        buttons.push(
            <SocialLoginButton
            icon_url = {item['icon']}
            text = {item['text']}/>
        )
    }

    return buttons
}

class LoginFooter extends Component {
    render() {
        
        return (
            <div className = "login-footer">
                <p className = "signup-link">
                   <a href = "#">
                    {this.props.text}
                   </a>
                </p>
                <SignUpDividerBar text = "Ou entre de outra forma"/>
                <div className = "social-login-btns">
                    {setSocialLogins()}
                </div>
            </div>
        )
    }
}


LoginFooter.PropTypes = {
    text: PropTypes.string
}


export default LoginFooter