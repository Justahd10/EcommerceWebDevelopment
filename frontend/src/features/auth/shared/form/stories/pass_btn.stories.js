import { PassVisibiltyBtn } from "../form";



PassVisibiltyBtn.propTypes = {
    mode: PropTypes.oneOf([
        'show_pass', "hidde_pass"
    ])
}

export default {
    title: "Auth/Shared/Form",
    component: PassVisibiltyBtn,
    parameters: {
        layout: "centered"
    },
    args: {
        mode: "show_pass"
    }
}


export const PrimaryButton = {}