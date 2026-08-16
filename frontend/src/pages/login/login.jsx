/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_factory'
import SocialAuthSection from '../../features/auth/shared/social_auth/social_auth'

import './login.css'



const LoginPage = ({ page_content, form_conf }) => {
    return (
        <main className = "login-main-content">
            <Header configs={page_content.header}/>
            <Form configs={
                {
                    content: page_content.form,
                    model: form_conf.login,
                }
            }/>
            <SocialAuthSection configs={page_content.socialAuth}/>
        </main>
    )
}


export default LoginPage
