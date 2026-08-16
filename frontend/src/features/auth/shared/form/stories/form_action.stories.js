import { FormAction } from "../form";



FormAction.propTypes = {
    act_type: PropTypes.oneOf([
        'submit_btn', 'nav_link'
    ]),
    label: PropTypes.string.isRequired
}


export default {
    title: "Auth/Shared/Form",
    component: FormAction,
    parameters: {
        layout: "centered"
    }
}


export const NavegationLink = {
    args: {
        label: "Me cadastrar",
        btn_type: "nav_link",
    }
}

export const SubmitButton = {
    args: {
        label: "REGISTRAR",
        act_type: "submit_btn",
    }
}