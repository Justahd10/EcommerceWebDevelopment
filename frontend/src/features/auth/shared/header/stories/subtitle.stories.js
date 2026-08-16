import PropTypes from "prop-types";
import { SubTitle } from "../header";



SubTitle.propTypes = {
    
}

export default {
    title: "Auth/Shared/Header",
    component: SubTitle,
    parameters: {
        layout: "centered"
    }
}


export const RegularSubtitle = {
    args: {
        title: "Faça login",
        desc: "E veja o que a nossa loja tem a oferecer"
    }
}

export const PasswordResetSubtitle = {
    args: {
        title: "Redefinição de senha",
        email: "ahd5digos@gmail.com",
        desc: "Insira o código de redefinição de senha e sua nova senha"
    }
}
