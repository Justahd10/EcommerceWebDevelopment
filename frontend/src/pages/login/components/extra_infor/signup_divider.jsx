import {Component} from 'react'
import PropTypes from 'prop-types'

import './signup_divider.css'



class SignUpDividerBar extends Component {
    render() {
        return (
            <div className = "">
                <hr className = ""/>
                <span className = "">
                    {this.props.text}
                </span>
                <hr className = ""/>
            </div>
        )
    }
}


SignUpDividerBar.PropTypes = {
    text: PropTypes.string
}


export default SignUpDividerBar