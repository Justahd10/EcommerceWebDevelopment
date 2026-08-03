import PropTypes from 'prop-types'

import './signup_divider.css'

function SignUpDividerBar({ text }) {
    return (
        <div className="login-divisor">
            <hr className="horizontal-row" />
            <span className="bar-text">{text}</span>
            <hr className="horizontal-row" />
        </div>
    )
}

SignUpDividerBar.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['mobile', 'desktop'])
}


export default SignUpDividerBar