import PropTypes from 'prop-types'

import './social_login_button.css'

function SocialLoginButton({ icon_url, text }) {
    return (
        <button className="social-login-button" type="button">
            <img className="social-login-icon" src={icon_url} />
            <span className="button-text">{text}</span>
        </button>
    )
}

SocialLoginButton.propTypes = {
    icon_url: PropTypes.string,
    text: PropTypes.string
}

export default SocialLoginButton
