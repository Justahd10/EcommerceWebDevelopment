import PropTypes from 'prop-types'

import './login_button.css'


function get_classes(is_primary) {
    const styles = ['login-submit-btn']

    if (is_primary) {
        styles.push('login-btn-primary')

        return styles 
    } else {
        return styles
    }
}

function LoginButton({ primary }) {
    return (
        <button className={get_classes(primary).join(' ')} type="submit">
            LOGIN
        </button>
    )
}


LoginButton.propTypes = {
    primary: PropTypes.bool
}


export default LoginButton