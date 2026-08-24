import PropTypes from "prop-types"
import SocialAuthSection from "../social_auth";

import login_page_content from '../../../../../pages/login/content.json'



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

export default {
    title: "Auth/Shared/SocialAuth",
    component: SocialAuthSection,
    parameters: {
        layout: "centered"
    },
    args: {
        configs: login_page_content.socialAuth
    }
}


export const PrimarySocialAuthSection = {}
