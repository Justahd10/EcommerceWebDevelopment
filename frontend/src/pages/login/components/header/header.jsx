import PropTypes from 'prop-types'

import TitleSubtitle from './title_subtitle'
import DivisorBar from './divisor_bar'

import './header.css'



const login_header_models = {
    'primary': {
        "title": <TitleSubtitle/>,
        "bar": <DivisorBar primary/>
    },
    'secondary': {
        "title": <TitleSubtitle centered/>,
        "bar": <DivisorBar/>
    }
}

function get_header_elements(primary) {
    const header_type =
    primary ? "primary" : "secondary"

    return login_header_models[header_type]
}

function LoginHeader({ primary, logo_img }) {
    const elements = get_header_elements(primary)

    return (
        <header className="login-header">
            <div className="shop-indety">
                <img className="logo" src={logo_img} alt="Logo da Online Shop" />
                {elements.title}
            </div>
            {elements.bar}
        </header>
    )
}

LoginHeader.propTypes = {
    primary: PropTypes.bool,
    logo_img: PropTypes.string
}


export default LoginHeader