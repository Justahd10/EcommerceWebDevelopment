import { createBrowserRouter, RouterProvider } 
from "react-router-dom";

// Form functionalitys
import form_functionalitys 
from "../features/auth/shared/form/form_functionalitys.jsx";

/*
        Pages
*/
import CreateAccountPage 
from "../pages/create_account/create_account.jsx";

import LoginPage from "../pages/login/login";
import loginPageContent from "../pages/login/content.json"

import ResetPasswordEmailPage 
from "../pages/reset_password/reset_pass_email.jsx";
import ResetPasswordCodePage 
from "../pages/reset_password/reset_pass_code.jsx";
import resetPassPagesContents
from "../pages/reset_password/content.json"


/*
        Auth security
*/
import { SetProtectedContent } from "../contexts/auth.jsx";



/*
        Routes
*/
const routes = createBrowserRouter(
    [
        {
            "path": "/cadastrar",
            "element": <h1>Página de criação de conta</h1>
        },
        {
            "path": "/login",
            "element": <LoginPage 
            page_content={loginPageContent}
            form_conf={form_functionalitys} />
        },
        {
            "path": "/redefinir-senha",
            element: <ResetPasswordEmailPage 
            page_content={resetPassPagesContents.email_step}
            form_conf={form_functionalitys}/>
        },
        {
            "path": "/redefinir-senha/:token",
            element: <h1>Página de redefinição de senha - Etapa do código</h1>
        },
        {
            "path": "/perfil",
            "element": <h1>Página de perfil do usuário </h1>
        }
    ]
)


export default routes