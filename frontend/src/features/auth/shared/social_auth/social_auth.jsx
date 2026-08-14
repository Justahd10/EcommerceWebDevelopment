import PropTypes from "prop-types"

import "./social_auth.css"



/*
        Molecules components
*/
export const TextDivider = ({ label }) => {
    return (
        <div className = "">
            <hr className = ""/>
            <span className = "">{label}</span>
            <hr className = ""/>
        </div>
    )
}

export const SocialLoginButton = ({ label, img_url }) => {
    return (
        <button className = "" type = "button">
            <img className = "" 
            alt = "Logo de login social"
            src = {img_url} />
            <span className = "">{label}</span>
        </button>
    )
}


/*
        Organisms component
*/
const SocialAuthSection = ({ configs }) => {
    let social_login_btns = configs.btns_attrs.map(
        item => <SocialLoginButton key={item.label}
        img_url={item.img_url} label={item.label}/>
    )
    
    social_login_btns = (
        <div className="">
            {social_login_btns}
        </div>
    )

    return (
        <section>
            <TextDivider label={configs.label}/>
            {social_login_btns}
        </section>
    )
}


export default SocialAuthSection


/*
        Storybook documentation
*/
SocialLoginButton.propTypes = {
    label: PropTypes.string.isRequired,
    img_url: PropTypes.oneOf([
        '/src/features/auth/assets/google_icon.png',
        '/src/features/auth/assets/facebook_icon.png'
    ])
}

SocialAuthSection.propTypes = {
    configs: PropTypes.object.isRequired
}