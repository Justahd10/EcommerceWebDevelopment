import { createBrowserRouter, RouterProvider } 
from "react-router-dom";

/*
        Pages
*/
import CreateAccountPageContent from "../pages/create_account/content.json"
import CreateAccountPage from "../pages/create_account/create_account.jsx";

import LoginPage from "../pages/login/login";
import loginPageContent from "../pages/login/content.json"

import ResetPasswordEmailPage 
from "../pages/reset_password/reset_pass_email.jsx";
import ResetPasswordCodePage 
from "../pages/reset_password/reset_pass_code.jsx";
import resetPassPagesContents
from "../pages/reset_password/content.json"



/*
        Routes
*/
const routes = createBrowserRouter(
    [
        {
            "path": "/cadastrar",
            "element": <CreateAccountPage page_content={CreateAccountPageContent}/>
        },
        {
            "path": "/login",
            "element": <LoginPage 
            page_content={loginPageContent}/>
        },
        {
            "path": "/redefinir-senha",
            element: <ResetPasswordEmailPage 
            page_content={resetPassPagesContents.email_step}/>
        },
        {
            "path": "/redefinir-senha/:token",
            element: <ResetPasswordCodePage 
            page_content={resetPassPagesContents.code_step}/>
        },
        {
            "path": "/perfil",
            "element": <h1>Página de perfil do usuário </h1>
        }
    ]
)


export default routes