import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Form functionalitys
import form_functionalitys from "../features/auth/shared/form/form_functionalitys.jsx";

// Pages
import CreateAccountPage from "../pages/create_account/create_account.jsx";

import LoginPage from "../pages/login/login";
import loginPageContent from "../pages/login/content.json"


import ResetPassPage from "../pages/reset_password/reset_password.jsx";
import ResetPassPageContent from "../pages/reset_password/content.json"

// Auth security
import { SetProtectedContent } from "../contexts/auth.jsx";



const routes = createBrowserRouter(
    [
        {
            "path": "/create_account",
            "element": <h1>Página de criação de conta</h1>
        },
        {
            "path": "/login",
            "element": <LoginPage 
            page_content={loginPageContent}
            form_conf={form_functionalitys} />
        },
        {
            "path": "/reset_password",
            element: <ResetPassPage 
            page_content={ResetPassPageContent}
            form_conf={form_functionalitys} />
        },
        {
            "path": "/profile",
            "element": <h1>Página de perfil do usuário </h1>
        }
    ]
)


export default routes