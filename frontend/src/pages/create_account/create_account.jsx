/* Contexts */
import { AuthContext } from "../../contexts/auth";

/* Custom Hooks */
import { useAuthForm, usePassFieldState} 
from "../../features/auth/services/auth_form_hooks";

/* Default Hooks */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

/* Children components */
import Carousel from "../../shared/components/Carousel";
import Header from "../../features/auth/shared/header/header";
import Form from "../../features/auth/shared/form/form_model";
import SocialAuthSection 
from "../../features/auth/shared/social_auth/social_auth";

import bannerImg from "../../assets/create_account_banner.jpg";
import './create_account.css'



const CreateAccountPage = ({ page_content }) => {
    let navigate = useNavigate()
    const { toogleUserSession, auth_state } = useContext(AuthContext)
    if (auth_state.has_auth) navigate("/perfil", { replace: true })

    const { is_pass_visible, tooglePassVisibility } = usePassFieldState()

    // Get form callback function and fields validation
    const callback_msgs = page_content.main.form.callback_msgs
    const fields_errs = page_content.main.form.fields_errs

    const { callback_func, schema } = 
    useAuthForm("CreateAccountPage", {
        'msgs': callback_msgs, 
        'toogleUserSession': toogleUserSession
    }, fields_errs)

    return (
        <div className="parent">
            <aside className="showcase-area">
                {
                    page_content.aside.type === "banner" && 
                    <img className="banner" src={bannerImg} 
                    alt="Banner de uma pessoa navegando na loja TechStock"/>
                }
                {
                    page_content.aside.type === "carousel" &&
                    <Carousel configs={page_content.aside.carousel}/>
                }
            </aside>
            <main className="main-content">
                <Header configs={page_content.main.header}/>
                <Form configs={{
                    'content': page_content.main.form,
                    'model': {
                        default_values:
                        page_content.main.form.default_values,
                        callback_func: callback_func,
                        reset_callback: true,
                        validation_schema: schema
                    }
                }}
                page_state={{
                    'state': is_pass_visible,
                    'set_func': tooglePassVisibility
                }}/>
                <SocialAuthSection 
                configs={page_content.main.socialAuth}/>
            </main>
        </div>
    )
}


export default CreateAccountPage
