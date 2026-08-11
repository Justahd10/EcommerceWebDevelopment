import PropTypes from "prop-types";

/*
        Atoms components
*/
export const FormButton = ({btn_attrs}) => {
    const { btn_class, btn_type, label } = btn_attrs

    return (
        <button className = {btn_class} type = {btn_type}>
            {label}
        </button>
    )
}

/*
        Molecules components
*/
export const FormBtnsGroup = (type) => {
    function createButton({btn_class, }){

    }
    switch (type){

    }
    
    return (
        <></>
    )
}

/*
        Organis component
*/
const Form = () => {
    return (
        <></>
    )
}

/*
        Storybook documentation
*/