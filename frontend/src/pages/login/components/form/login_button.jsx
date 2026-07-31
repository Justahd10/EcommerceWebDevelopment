import {Component} from 'react'
import PropTypes from 'prop-types'

import './login_button.css'


function get_classes(is_primary) {
    const styles = ['login-submit-btn']

    if (is_primary) {
        styles.push('primary')

        return styles 
    } else {
        return styles
    }
}

class LoginButton extends Component {
    render() {
        return (
            <button className = {
                get_classes(this.props.primary).join(' ')
            } type = "submit">
                LOGIN
            </button>
        )
    }
}


LoginButton.PropTypes = {
    primary: PropTypes.bool
}


export default LoginButton