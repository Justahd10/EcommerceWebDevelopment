import useAuthForm from "../../features/auth/services/useAuthForm.js"
import { useState } from "react"

/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_model.jsx'
import SocialAuthSection from '../../features/auth/shared/social_auth/social_auth'

import './login.css'



const LoginPage = ({ page_content }) => {
    // Page level state
    const [is_pass_visible, setIsPassVisible] = useState(false)

    function tooglePassVisibility(){
        setIsPassVisible(is_pass_visible?false:true)
    }

    // Get form callback function and fields validation
    const callback_msgs = page_content.form.callback_msgs
    const fields_errs = page_content.form.fields_errs

    const { callback_func, schema } = 
    useAuthForm("LoginPage", {
        msgs: callback_msgs
    }, fields_errs)

    return (
        <main className = "login-main-content">
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
                    },
                }
            } page_state={{
                'state': is_pass_visible,
                'set_func': tooglePassVisibility
            }}/>
            <SocialAuthSection 
            configs={page_content.socialAuth}/>
        </main>
    )
}


export default LoginPage
