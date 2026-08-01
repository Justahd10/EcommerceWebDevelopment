import LoginFields from "../components/form/fields";



export default {
    title: "Login/Form/Fields",
    component: LoginFields,
    parameters: {
        layout: "centered"
    },
    args: {
        pass_btn_mode: "show",
        err_msg: "Endereço de email inválido",
        checkbox_msg: "Lembre de mim"
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
        email_placeholder: "seu@email.com",
        pass_placeholder: "sua senha"
    }
}