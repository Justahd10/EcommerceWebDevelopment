import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import "./form.css"

import FormActions from './form_actions'
import Fields from './form_fields'



/*
        Organism component
*/
// Authentication feature form factory
const Form = ({ configs, page_state }) => {
    const {
        register, handleSubmit, formState: { errors }
    } = useForm(
        {
            defaultValues: configs.model.default_values,
            resolver: zodResolver(
                configs.model.validation_schema
            )
        }
    )

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
                <Fields register={register}
                configs={configs.content}
                page_state={page_state}/>
            </div>

            <span className={callback.msg_class}>
                {
                    handleFieldsErrs() ??
                    callback.msg
                }
            </span>

            <div className="">
                <FormActions 
                configs={configs.content}/>
            </div>
        </form>
    )
}


export default Form