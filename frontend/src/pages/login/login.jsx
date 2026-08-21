import * as z from "zod"

/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_factory'
import SocialAuthSection from '../../features/auth/shared/social_auth/social_auth'

import './login.css'



const LoginPage = ({ page_content }) => {
    // Form callback function
    const callback_msgs = page_content.form.callback_msgs

    async function requestLogin(data) {
        const req_body = JSON.stringify({
            "email": data.usr_email,
            "password": data.usr_pass,
            "remember_me": data.remember_me
        })

        const response = await fetch(
            "http://localhost:3000/api/auth/login",
            {
                "method": "POST",
                "body": req_body,
                "headers": {
                    "Content-type": "application/json",
                },
                "credentials": "include"
            }
        )

        const status = await response.status
        
        if (status !== 200) {
            return {
                msg_class: "",
                msg: callback_msgs.error
            }
        }

        return {
            msg_class: "",
            msg: callback_msgs.success
        }
    }

    // Form schema validation
    const fields_errs = page_content.form.fields_errs

    const schema = z.object(
        {
            "usr_email": z.email({error: fields_errs.usr_email}),
            "usr_pass": z.string().min(8, 
                {error: fields_errs.usr_pass}),
            "remember_me": z.boolean()
        }
    )

    return (
        <main className = "login-main-content">
            <Header configs={page_content.header}/>
            <Form configs={
                {
                    content: page_content.form,
                    model: {
                        default_values: 
                        page_content.form.default_values,
                        callback_func: requestLogin,
                        reset_callback: true,
                        validation_schema: schema
                    },
                }
            }/>
            <SocialAuthSection configs={page_content.socialAuth}/>
        </main>
    )
}


export default LoginPage
