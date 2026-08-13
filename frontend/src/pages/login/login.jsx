/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form'
import SocialAuthSection from '../../features/auth/shared/social_auth/social_auth'

import './login.css'



const LoginPage = ({ page_configs }) => {
    return (
        <main className = "login-main-content">
            <Header configs={page_configs.header}/>
            <Form configs={page_configs.form}/>
            <SocialAuthSection configs={page_configs.socialAuth}/>
        </main>
    )
}


export default LoginPage
