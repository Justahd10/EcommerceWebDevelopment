/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_factory'

import "./reset_pass_email.css"



const ResetPasswordEmailPage = ({ page_content, form_conf }) => {
    return (
        <main className="">
            <Header configs={page_content.header}/>
            <Form configs={
                {
                    content: page_content.form,
                    model: form_conf.reset_password_email
                }
            }/>
        </main>
    )
}


export default ResetPasswordEmailPage