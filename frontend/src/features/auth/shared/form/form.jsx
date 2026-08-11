import { useState } from "react";
import PropTypes from "prop-types";



/*
        Atoms components
*/
export const ErrMsg = ({ label }) => {
    return <span className = "">{label}</span>
}

// Inputs models
const input_types = {
    "email": {"type": "email", "name": "usr_email"},
    "password": {"type": "password", "name": "usr_pass"},
    "pass_confirm": {"type": "password", "name": "pass_confirm"},
    "remember_me": {"type": "checkbox", "name": "remember_me"}
}

export const Input = ({ input_type, configs}) => {
    const attrs = configs[input_type]

    return <input className = "" 
            type = {attrs.type} 
            name = {attrs.name}/>
}

export const FormButton = ({ configs }) => {
    return (
        <button 
        className = {configs.btn_class} 
        type = {configs.btn_type}
        name = {configs.btn_name}>
            {configs.btn_label}
        </button>
    )
}

/*
        Molecules components
*/
// Fields models
const fields_types = {
    "email": {
        "label": "Email",
        "structure": (
            <Input configs = {input_types} 
            input_type = "email" />
        )
    },
    "password": {
        "label": "Senha",
        "structure": (
            <div className = "">
                <Input configs = {input_types} 
                input_type = "password" />
                <button className = "" type = "submit"></button>
            </div>
        )
    },
    "pass_confirm": {
        "label": "Confirmação de senha",
        "structure": (
            <Input configs = {input_types} 
            input_type = "pass_confirm" />
        )
    }
}

export const Field = ({ field_type, configs }) => {
    return (
        <label className = "">
            {configs[field_type].label}
            {configs[field_type].structure}
        </label>
    )
}

// Buttons models
const buttons_types = {
    "login": [
        {
            "btn_class": "", "btn_type": "",
            "btn_name": "", "btn_label": ""
        },
        {
            "btn_class": "", "btn_type": "",
            "btn_name": "", "btn_label": ""
        }
    ],
    "register": [
        {
            "btn_class": "", "btn_type": "",
            "btn_name": "", "btn_label": ""
        }, 
        {
            "btn_class": "", "btn_type": "",
            "btn_name": "", "btn_label": ""
        }
    ]
}

export const FormBtnsGroup = ({ type, configs }) => {
    const buttons = []

    for (const btn_conf of configs[type]){
        buttons.push(
            <FormButton key = {btn_conf.name} 
            configs = {configs}/>
        )
    }

    return (
        <div className = "">
            {buttons}
        </div>
    )
}

/*
        Organis component
*/
const Form = ({ form_type }) => {
    // Fields state variables setting
    const [fields, setFields] = useState(() => {
        const fields_values = {"name": "", "password": ""}
        let new_fields = {}

        switch (form_type){
            case "login":
                new_fields = {"remember_me": false}
                break;
            
            case "register":
                new_fields = {"pass_confirm": ""}
                break;
        }

        Object.assign(fields_values, new_fields)
        return fields_values
    })

    function toogleFieldsState(){
        event.preventDefault()

        const target = event.target
    }

    // Fields building
    const fields = [
        <Field configs = {fields_types} 
        field_type = "email" />, 
        <Field configs = {fields_types} 
        field_type = "password" />
    ]

    if (form_type === "register"){
        fields.push(
            <Field configs = {fields_types} 
            field_type = "pass_confirm"/>
        )
    }

    return (
        <form>
            <div className = "">
                {fields}
            </div>
            <FormBtnsGroup configs = {buttons_types} 
            type = {form_type}/>
            <ErrMsg label = ""/>
        </form>
    )
}


export default Form

/*
        Storybook documentation
*/