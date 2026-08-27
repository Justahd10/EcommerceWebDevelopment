import { useAuthForm } from "../../features/auth/services/auth_form_hooks.js"

/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_model.jsx'

import "./reset_pass_email.css"



const ResetPasswordEmailPage = ({ page_content }) => {
    const callback_msgs = page_content.form.callback_msgs
    const fields_errs = page_content.form.fields_errs

    const { callback_func, schema } = 
    useAuthForm("ResetPassEmailPage", {
        msgs: callback_msgs
    }, fields_errs)

    return (
        <main className="">
            <Header configs={page_content.header}/>
            <Form configs={
                {
                    content: page_content.form,
                    model: {
                        default_values: 
                        page_content.form.default_values,
                        callback_func: callback_func,
                        reset_callback: true,
                        validation_schema: schema
                    }
                }
            }/>
        </main>
    )
}


export default ResetPasswordEmailPage