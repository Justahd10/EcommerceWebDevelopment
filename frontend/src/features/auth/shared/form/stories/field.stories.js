import { Field } from "../form";



export default {
    title: "Auth/Shared/Form",
    component: Field,
    parameters: {
        layout: "centered"
    },
    args: {
        label: "Email",
        field_type: "email"
    }
}

export const PrimaryField = {
    args: {
        field_type: "remember_me"
    }
}