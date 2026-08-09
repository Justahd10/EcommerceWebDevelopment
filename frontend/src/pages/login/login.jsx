/* Access to child components of the page */
import LoginForm from '../../features/auth/login/components/form/form'
import LoginHeader from '../../features/auth/login/components/header/header'
import LoginFooter from '../../features/auth/login/components/extra_infor/login_footer'

import ShopLog from './assets/online_shop_logo_icon.jpg'

import './login.css'



const LoginPage = () => {
    return (
        <main className = "login-main-content">
            <LoginHeader primary logo_img = {ShopLog}/>
            <LoginForm pass_btn_mode = "show"/>
            <LoginFooter text = "Já sou cadastrado"/>
        </main>
    )
}


export default LoginPage