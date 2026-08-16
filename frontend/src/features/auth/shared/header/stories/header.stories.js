import PropTypes from "prop-types"
import Header from "../header";

import login_page_content from '../../../../../pages/login/content.json'



Header.propTypes = {
    configs: PropTypes.object.isRequired
}

export default {
    title: "Auth/Shared/Header",
    component: Header,
    parameters: {
        layout: "centered"
    },
    args: {
        configs: login_page_content.header
    }
}


export const PrimaryHeader = {}