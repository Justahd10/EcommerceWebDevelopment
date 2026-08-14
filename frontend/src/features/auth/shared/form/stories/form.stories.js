import { MemoryRouter } from 'react-router-dom'
import Form from "../form";

import login_page_content from '../../../../../pages/login/content.json'



export default {
    title: "Auth/Shared/Form",
    component: Form,
    parameters: {
        layout: "centered"
    },
    decorators: [
        (Story) => {
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        }
    ]
}


export const LoginForm = {
    args: {
        configs: login_page_content.form
    }
}