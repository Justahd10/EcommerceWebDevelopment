import DivisorBar from "../components/header/divisor_bar";


export default {
    title: "Login/Header/Divisor",
    component: DivisorBar,
    parameters: {
        layout: "centered"
    },
    args: {
        text: "Ou entre com"
    }
}


export const PrimaryBar = {
    args: {
        primary: true
    }
}