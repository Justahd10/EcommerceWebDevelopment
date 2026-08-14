import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import CreateAccountPage from "../pages/create_account/create_account.jsx";

import LoginPage from "../pages/login/login";
import loginPageContent from "../pages/login/content.json"

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
            "element": <LoginPage page_configs={loginPageContent} />
        },
        {
            "path": "/profile",
            "element": <h1>Página de perfil do usuário </h1>
        }
    ]
)


export default routes