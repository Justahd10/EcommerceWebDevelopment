import SocialLoginButton from "../components/extra_infor/social_login_button";

import googleIcon from '../assets/google_icon.png'

export default {
    title: "Login/ExtraInformations/Buttons",
    component: SocialLoginButton,
    parameters: {
        layout: "centered"
    },
    args: {
        icon_url: googleIcon,
        text: "Google"
    }
}


export const PrimarySocialLoginButton = {}