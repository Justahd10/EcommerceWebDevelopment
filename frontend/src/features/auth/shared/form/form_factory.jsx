import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import visibility_icon 
from "../../assets/visibility.svg"
import visibility_off_icon 
from "/src/features/auth/assets/visibility_off.svg"

import "./form.css"



/*
        Atoms components
*/
export const FormAction = ({ act_type, configs }) => {
    if (act_type === "nav_link"){
        return (
            <Link to={configs.link} className={configs.class_name}>
                {configs.label}
            </Link>
        )
    } else if (act_type === "submit_btn"){
        return (
            <button className={configs.class_name} 
            type="submit">
                {configs.label}
            </button>
        )
    }
}


/*
        Molecules components
*/
export const PassVisibiltyBtn = ({ mode }) => {
    const btn_icon = 
    mode === "show_pass" ? visibility_icon : visibility_off_icon;

    return (
        <button className="pass-view-btn" type="button">
            <img src={btn_icon} alt="" />
        </button>
    )
}

export const Field = ({ 
    field_type, input_attrs, label, 
    register, validators
 }) => {
    // Set input style class by field type
    const input_class = 
    field_type === "RememberField" ? "" : ""

    // Set input attributes and validator
    const input = <input 
    {
        ...register(
            input_attrs.name,
            {validate: validators[input_attrs.name]}
        )
    }
    className={input_class}
    type={input_attrs.type}/>

    // Set structure for the input
    const field_models = {
        "RememberField": (<>{input}{label}</>),
        "PasswordField": (
            <>
                {label}
                <div className = "">
                    {input}
                    <PassVisibiltyBtn mode={"show_pass"}/>
                </div>
            </>
        )
    }

    let elements = field_models[field_type]
    if (elements === undefined) {
        elements = <>{label}{input}</>
    }

    return (
        <label className="">
            {elements}
        </label>
    )
}


/*
        Organism component
*/
// Authentication feature form factory
const Form = ({ configs }) => {
    const {
        register, handleSubmit, formState: { errors }
    } = useForm(
        {
            defaultValues: 
            configs.model.default_values
        }
    )

    function generateFormFields(){
        const fields = 
        configs.content.fields.map(
            conf => (
                <Field 
                validators={configs.model.validators}
                register={register} 
                key={conf.input_attrs.type} 
                input_attrs={conf.input_attrs}
                label={conf.label} 
                field_type={conf.type} />
            )
        )

        return fields
    }

    function generateFormActions(){
        const form_actions =
        configs.content.actions.map(
            conf => <FormAction
            key={conf.configs.label}
            act_type={conf.act_type}
            configs={conf.configs}/>
        )

        return form_actions
    }

    const [callback, setCallBack] =
    useState({"msg": "", "msg_class": ""})

    const onSubmit = async (datas) => {
        const callback_func =
        configs.model.callback_func

        if (callback_func){
            const result = 
            await callback_func(datas)
            setCallBack(result)
        }
    }

    const onChange = () => {
        if (configs.model.reset_callback){
            setCallBack(
                {
                    msg_class: "", 
                    msg: ""
            })
        }
    }

    function handleFieldsErrs(){
        const inputs =
        Object.keys(
            configs.model.default_values
        )

        for (const input of inputs){
            if (errors[input]?.message){
                return errors[input]?.message
            }
        }
    }

    return (
        <form className={
            configs.content.class_name
        }
        onSubmit={handleSubmit(onSubmit)} 
        onChange={
            configs.model.change_func ?? onChange
        }>
            <div className="">
                {generateFormFields()}
            </div>

            <span className={callback.msg_class}>
                {
                    handleFieldsErrs() ??
                    callback.msg
                }
            </span>

            <div className="">
                {generateFormActions()}
            </div>
        </form>
    )
}


export default Form