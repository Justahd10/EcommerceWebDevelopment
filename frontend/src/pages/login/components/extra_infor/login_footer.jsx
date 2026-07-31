import {Component} from 'react'
import PropTypes from 'prop-types'

/* Child elements of the component*/
import SignUpDividerBar from './signup_divider'
import SocialLoginButton from './social_login_button'

/* Buttons images */


import './login_footer.css'



const social_logins = [
    {
        "icon": "",
        "text": "Entrar com o Google"
    }
]

function setSocialLogins() {
    const buttons = []

    for (const item of social_logins) {
        buttons.push(
            <SocialLoginButton
            icon_url = {item['icon']}
            name = {item['text']}/>
        )
    }

    return buttons
}

class LoginFooter extends Component {
    render() {
        
        return (
            <div className = "">
                <p className = "">
                    Não é cadastrado? <a href = "#">Clique aqui</a>
                </p>
                <SignUpDividerBar text = "Ou entre de outra forma"/>
                <div className = "">
                    {setSocialLogins()}
                </div>
            </div>
        )
    }
}


LoginFooter.PropTypes = {}


export default LoginFooter