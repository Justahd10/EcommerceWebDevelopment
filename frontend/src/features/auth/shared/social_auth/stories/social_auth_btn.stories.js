import { SocialLoginButton } from "../social_auth";



export default {
    title: "Auth/Shared/SocialAuth",
    component: SocialLoginButton,
    parameters: {
        layout: "centered"
    },
    args: {
        label: "Google",
        img_url: "/src/features/auth/assets/google_icon.png"
    }
}


export const PrimarySocialAuthBtn = {}