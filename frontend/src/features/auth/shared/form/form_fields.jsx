import { useState } from "react"
import visibility_icon 
from "../../assets/visibility.svg"
import visibility_off_icon 
from "/src/features/auth/assets/visibility_off.svg"



/*
        Molecules components
*/
export const PassVisibiltyBtn = ({ pass_visible, pass_func }) => {
    return (
        <button className="pass-view-btn" type="button"
        onClick={pass_func}>
            <img src={
                pass_visible ?
                visibility_off_icon : visibility_icon
            } alt="" />
        </button>
    )
}

function createInput(input_type, input_name, register){
    return (
        <input {...register(input_name)}
        className=""
        type={input_type}/>
    )
}

// Default field structure, used for email, 
// and password reset code
function createField(params){
    return (
        <label className="">
            <span className="">{params.label}</span>
            {createInput(
                params.input_attrs.type,
                params.input_attrs.name,
                params.register
            )}
        </label>
    )
}

function createPassField(params){
    const input_type = params.state?
    "text" : "password"

    return (
        <label className="">
            <span className="">
                {params.label}
            </span>
            <div className="">
                {createInput(
                    input_type, 
                    params.input_attrs.name, 
                    params.register
                )}
                <PassVisibiltyBtn 
                pass_visible={params.state}
                pass_func={params.set_func}/>
            </div>
        </label>
    )
}

function createPassConfirmField(params){    
    const input_type = params.state?
    "text" : "password"

    return (
        <label className="">
            <span className="">
                {params.label}
            </span>
            {createInput(
                input_type, 
                params.input_attrs.name, 
                params.register
            )}
        </label>
    )
}

function createRememberField(params){
    return (
        <label className="">
            <span className="">
                {params.label}
            </span>
            {createInput(
                "checkbox", 
                params.input_attrs.name, 
                params.register
            )}
        </label>
    )
}


// Form field factory
export const Field = ({ 
    label, field_attrs, input_attrs, register, 
    state, set_func
}) => {
    function renderField(){
        const fields_types = {
            "EmailField": createField,
            "PasswordField": createPassField,
            "PassConfirmField": createPassConfirmField,
            "RememberField": createRememberField,
            "CodeField": createField
        }

        return fields_types[field_attrs.type](
            {
                'label': label, 'input_attrs': input_attrs,
                'register': register, 'state': state,
                'set_func': set_func
            }
        )
    }

    return renderField()
}

const Fields = ({ configs, register, page_state }) => {
    const fields = configs.fields.map(
        conf => {
            let field_params = {
                'field_attrs': conf.field_attrs,
                'label': conf.label,
                'input_attrs': conf.input_attrs,
                'register': register
            }

            if (conf.toogleableByPageState){
                field_params = Object.assign(
                    field_params, page_state
                )
            }

            return <Field key={conf.input_attrs.name} 
            {...field_params} />
        }
    )

    return fields
}


export default Fields