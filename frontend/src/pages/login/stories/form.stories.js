import LoginForm from "../components/form/form";



export default {
    title: "Login/Form",
    component: LoginForm,
    parameters: {
        layout: "centered"
    },
    args: {
        err_msg: "",
        pass_btn_mode: "show"
    }
}

export const PrimaryLoginForm = {} 