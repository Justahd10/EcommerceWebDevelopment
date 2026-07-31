import {Component} from 'react'
import PropTypes from 'prop-types'

import './divisor_bar.css'


class DivisorBar extends Component {
    render() {
        let bar_styles

        if (this.props.primary) {
            bar_styles = ["divisor-bar", "primary-divisor-bar"]
        } else {
            bar_styles = ["divisor-bar"]
        }

        return (
            <hr className = {bar_styles.join(' ')}></hr>
        )
    }
}


DivisorBar.PropTypes = {
    primary: PropTypes.bool
}

export default DivisorBar