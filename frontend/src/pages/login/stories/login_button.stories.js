import LoginButton from "../components/form/login_button";


export default {
    title: "Login/Form/Buttons",
    component: LoginButton,
    parameters: {
        layout: "centered"
    }
}


export const PrimaryLoginButton = {
    args: {
        primary: true
    }
}