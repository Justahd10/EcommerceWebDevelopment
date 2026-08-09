import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Page404 from "../pages/404/404_page";
import LoginPage from "../pages/login/login";
import ProfilePage from "../pages/profile/profile.jsx";

// Auth security
import { SetProtectedContent } from "../contexts/auth.jsx";



const routes = createBrowserRouter(
    [
        {
            "path": "*",
            "element": <Page404 />
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