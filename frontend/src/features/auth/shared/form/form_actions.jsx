import { useContext } from "react"
import { AuthContext } from "../../../../contexts/auth"
import { Link } from "react-router-dom"



/*
        Actions strategy
*/
function createFormAction(act_type, params){
    const LinkAction = ()=>{
        return (
            <Link to={params.link} 
            className="">
                {params.label}
            </Link>
        )
    }

    const ButtonAction = ()=>{
        const { auth_state } = useContext(AuthContext)

        return (
            <button className="" 
            type={params.btn_type} 
            disabled={auth_state.fetching || false}>
                {params.label}
            </button>
        )
    }

    const actions_strategy = {
        "nav_link": LinkAction,
        "submit_btn": ButtonAction
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