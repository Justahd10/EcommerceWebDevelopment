import * as z from "zod"

import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_factory'



const ResetPasswordCodePage = ({ page_content }) => {
    const [valid_access, setValidAccess] = useState(null)
    let params = useParams()

    // Form callback function
    const callback_msgs = page_content.form.callback_msgs

    async function sendNewPassword(datas){
        const response = await fetch(
            "http://localhost:3000/api/auth/pass_reset_confirm",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication": params.token
                },
                body: JSON.stringify(
                    {
                        reset_code: datas.pass_reset_code,
                        new_password: datas.usr_pass
                    }
                )
            }
        )

        // Tratar resultado
        const status = await response.status

        if (status !== 200){
            return {
                msg_class: "",
                msg: callback_msgs.success,
            }
        } else {
            return {
                msg_class: "",
                msg: callback_msgs.success,
            }
        }
    }

    // Form schema validation
    const fields_errs = page_content.form.fields_errs

    const schema = z.object(
        {
            pass_reset_code: z.string().length(6, 
            { error: fields_errs.pass_reset_code}),
            usr_pass: z.string().min(8, 
            { error: fields_errs.usr_pass }),
            usr_pass_confirm: z.string().min(8, 
            { error: fields_errs.usr_pass })
        }
    ).refine(
        (val) => val.usr_pass === val.usr_pass_confirm,
        { error: fields_errs.usr_pass_confirm, path: ["usr_pass_confirm"] }
    )
    
    useEffect(() => {
        async function getPassResetAuth(token, setAccess){
            const response = await fetch(
                "http://localhost:3000/api/auth/pass_reset_validate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authentication": token
                    }
                }
            )

            const status_code = await response.status

            if (status_code === 200){
                setAccess(true)
            } else {setAccess(false)}
        }

        getPassResetAuth(
            params.token, setValidAccess
        )
    }, [])

    const page = (
        <>
            <Header configs={page_content.header}/>
            <Form configs={
                {
                    content: page_content.form,
                    model: {
                        default_values: 
                        page_content.form.default_values,
                        callback_func: sendNewPassword,
                        reset_callback: true,
                        validation_schema: schema
                    }
                }
            }/>
        </>
    )

    if (valid_access === null) {
        return <main className="">Carregando...</main>
    }

    if (valid_access === false) {
        return <Navigate to="/redefinir-senha" replace />
    }

    return (
        <main className="">
            {page}
        </main>
    )
}


export default ResetPasswordCodePage