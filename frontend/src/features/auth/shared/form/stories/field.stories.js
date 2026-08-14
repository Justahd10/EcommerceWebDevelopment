import { Field } from "../form";

import login_page_content from '../../../../../pages/login/content.json'
import register_page_content from '../../../../../pages/create_account/content.json'



export default {
    title: "Auth/Shared/Form",
    component: Field,
    parameters: {
        layout: "centered"
    }
}

export const EmailField = {
    args: login_page_content.form.fields[0]
}

export const PasswordField = {
    args: login_page_content.form.fields[1]
}

export const PassConfirm = {
    args: register_page_content.form.fields[2]
}

export const RememberField = {
    args: {
        label: "Mantenha-me conectado",
        field_type: "RememberField",
        input_attrs: {
            type: "checkbox",
            name: "remember_me"
        }
    }
}