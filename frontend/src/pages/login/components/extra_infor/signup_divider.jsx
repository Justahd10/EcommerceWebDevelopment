import {Component} from 'react'
import PropTypes from 'prop-types'

import './signup_divider.css'



class SignUpDividerBar extends Component {
    render() {

        return (
            <div className = "login-divisor">
                <hr className = "horizontal-row"/>
                <span className = "bar-text">
                    {this.props.text}
                </span>
                <hr className = "horizontal-row"/>
            </div>
        )
    }
}


SignUpDividerBar.PropTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['mobile', 'desktop'])
}


export default SignUpDividerBar