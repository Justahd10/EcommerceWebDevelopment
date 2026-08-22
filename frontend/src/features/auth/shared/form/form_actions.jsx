import { Link } from "react-router-dom"



/*
        Actions strategy
*/
function createFormAction(act_type, params){
    function createLinkStrategy(){
        return (
            <Link to={params.link} 
            className="">
                {params.label}
            </Link>
        )
    }

    function createButtonStrategy(){
        return (
            <button className="" 
            type={params.btn_type}>
                {params.label}
            </button>
        )
    }

    const actions_strategy = {
        "nav_link": createLinkStrategy,
        "submit_btn": createButtonStrategy
    }

    return actions_strategy[act_type](params)
}

/*
        Molecule component - Context componenet
*/
export const FormAction = ({ act_type, params }) => {
    return createFormAction(act_type, params)
}

const FormActions = ({ configs }) => {
    const form_actions = configs.actions.map(
        conf => <FormAction 
        key={conf.params.label}
        act_type={conf.act_type}
        params={conf.params}/>
    )

    return form_actions
}


export default FormActions