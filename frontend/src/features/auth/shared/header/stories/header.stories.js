import Header from "../header";

import login_page_content from '../../../../../pages/login/content.json'



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