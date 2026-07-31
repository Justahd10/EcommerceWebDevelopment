import TitleSubtitle from "../components/header/title_subtitle.jsx";


export default {
    title: "Login/Header/title_subtitle",
    component: TitleSubtitle,
    parameters: {
        layout : "centered"
    }
}


export const StartedTitle = {
    args: {
        centered: false
    }
}

export const CenteredTitle = {
    args: {
        centered: true
    }
}