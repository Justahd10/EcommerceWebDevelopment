import PropTypes from 'prop-types'

import './divisor_bar.css'


function DivisorBar({ primary }) {
    const bar_styles = primary
        ? ['divisor-bar', 'primary-divisor-bar']
        : ['divisor-bar']

    return <hr className={bar_styles.join(' ')} />
}

DivisorBar.propTypes = {
    primary: PropTypes.bool
}

export default DivisorBar