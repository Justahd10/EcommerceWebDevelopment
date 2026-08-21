import * as z from "zod"

/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_factory'

import "./reset_pass_email.css"



const ResetPasswordEmailPage = ({ page_content }) => {
    // Form callback function
    const callback_msgs = page_content.form.callback_msgs

    async function sendPasswordResetEmail(datas){
        fetch(
            "http://localhost:3000/api/auth/pass_reset_request",
            {
                method: "POST",
                body: JSON.stringify({"email": datas.usr_email}),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        // Defualt callback
        return {
            msg_class: "",
            msg: callback_msgs.success,
        }
    }

    // Form schema validation
    const fields_errs = page_content.form.fields_errs

    const schema = z.object(
        {
            "usr_email": z.email({error: fields_errs.usr_email})
        }
    )

    return (
        <main className="">
            <Header configs={page_content.header}/>
            <Form configs={
                {
                    content: page_content.form,
                    model: {
                        default_values: 
                        page_content.form.default_values,
                        callback_func: sendPasswordResetEmail,
                        reset_callback: true,
                        validation_schema: schema
                    }
                }
            }/>
        </main>
    )
}


export default ResetPasswordEmailPage