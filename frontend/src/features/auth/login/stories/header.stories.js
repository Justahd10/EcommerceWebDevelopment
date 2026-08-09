import LoginHeader from '../components/header/header'

import logoImg from '../assets/online_shop_logo_icon.jpg'


export default {
    title: "Login/header",
    component: LoginHeader,
    parameters: {
        layout: "top"
    },
    args: {
        logo_img: logoImg
    }
}


export const PrimaryHeader = {
    args: {
        primary: true
    }
}