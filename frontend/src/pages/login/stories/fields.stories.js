import LoginFields from "../components/form/fields";

import visibilityImg from '../assets/visibility.png'

export default {
    title: "Login/Form/Fields",
    component: LoginFields,
    parameters: {
        layout: "centered"
    },
    args: {
        visibility_img: visibilityImg
    }
}


export const WithLabels = {
    args: {
        email_label: "Email",
        pass_label: "Senha"
    }
}

export const WithPlaceholder = {
    args: {
        email_placeholder: "seu@exemplo.email.com",
        pass_placeholder: ""
    }
}