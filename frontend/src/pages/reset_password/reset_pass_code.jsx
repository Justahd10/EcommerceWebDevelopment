import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_factory'

/* Services */
import { getPassResetAuth } from '../../features/auth/password_reset'



const ResetPasswordCodePage = ({ page_content, form_conf }) => {
    const [valid_access, setValidAccess] = useState(null)
    let params = useParams()

    useEffect(() => {
        getPassResetAuth(params.token, setValidAccess)
    }, [])

    const page = (
        <>
            <Header configs={page_content.header}/>
            <Form configs={
                {
                    content: page_content.form,
                    model: form_conf.reset_password_code
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