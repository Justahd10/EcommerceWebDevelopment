import { FormButton } from "../form";



export default {
    title: "Auth/Shared/Form",
    component: FormButton,
    parameters: {
        layout: "centered"
    }
}


export const ToLoginButton = {
    args: {
        label: "LOGIN",
        btn_type: "submit",
        btn_class: "primary-form-button"
    }
}

export const ToRegisterButton = {
    args: {
        label: "REGISTRAR",
        btn_type: "button",
        btn_class: "primary-form-button"
    }
}