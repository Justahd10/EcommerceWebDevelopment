import useAuthForm from "../../features/auth/services/useAuthForm.js"

import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_model.jsx'



const ResetPasswordCodePage = ({ page_content }) => {
    const [valid_access, setValidAccess] = useState(null)
    const [is_pass_visible, setIsPassVisible] = useState(false)

    function tooglePassVisibility(){
        setIsPassVisible(is_pass_visible?false:true)
    }

    let params = useParams()

    // Form callback function
    const callback_msgs = page_content.form.callback_msgs
    const fields_errs = page_content.form.fields_errs

    const { callback_func, schema } = 
    useAuthForm(
        "ResetPassCodePage", {
            msgs: callback_msgs, token: params.token
        }, fields_errs
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
    }, [params.token])

    const page = (
        <>
            <Header configs={page_content.header}/>
            <Form configs={
                {
                    content: page_content.form,
                    model: {
                        default_values: 
                        page_content.form.default_values,
                        callback_func: callback_func,
                        reset_callback: true,
                        validation_schema: schema
                    }
                }
            } page_state={{
                'state': is_pass_visible,
                'set_func': tooglePassVisibility
            }}/>
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