import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import CreateAccountPage from "../pages/create_account/create_account.jsx";
import LoginPage from "../pages/login/login";
import ProfilePage from "../pages/profile/profile.jsx";

// Auth security
import { SetProtectedContent } from "../contexts/auth.jsx";



const routes = createBrowserRouter(
    [
        {
            "path": "/create_account",
            "element": <CreateAccountPage />
        },
        {
            "path": "/login",
            "element": <LoginPage />
        },
        {
            "path": "/profile",
            "element": <SetProtectedContent page_component = {<ProfilePage />} />
        }
    ]
)


export default routes