import SocialAuthSection from "../social_auth";

import login_page_content from '../../../../../pages/login/content.json'



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