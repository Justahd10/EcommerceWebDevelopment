/* Children components */
import Carousel from "../../shared/components/Carousel";
import Header from "../../features/auth/shared/header/header";
import Form from "../../features/auth/shared/form/form_model";
import SocialAuthSection 
from "../../features/auth/shared/social_auth/social_auth";

import bannerImg from "../../assets/create_account_banner.jpg";
import './create_account.css'

/*

*/

const CreateAccountPage = ({ page_content }) => {
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
                MAIN
            </main>
        </div>
    )
}


export default CreateAccountPage
