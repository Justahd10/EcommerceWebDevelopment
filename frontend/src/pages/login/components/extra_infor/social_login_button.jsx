import {Component} from 'react'
import PropTypes from 'prop-types'

import './social_login_button.css'



class SocialLoginButton extends Component {
    render() {
        return (
            <button className = "" type = "button">
                <img className = "" src = {this.props.icon_url}/>
                {this.props.text}
            </button>
        )
    }
}


SocialLoginButton.PropTypes = {
    icon_url: PropTypes.string,
    text: PropTypes.string
}


export default SocialLoginButton
