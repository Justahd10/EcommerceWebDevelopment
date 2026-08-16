import { useState } from 'react'

/* Access to child components of the page */
import Header from '../../features/auth/shared/header/header'
import Form from '../../features/auth/shared/form/form_factory'
import SocialAuthSection from '../../features/auth/shared/social_auth/social_auth'



const ResetPasswordEmailPage = ({ configs }) => {
    return (
        <main className="">

        </main>
    )
}

const ResetPasswordCodePage = ({ configs }) => {
    return (
        <main className="">

        </main>
    )
}

const ResetPassPages = ({ page_content, form_conf }) => {
    const [reset_step, setResetStep] = useState("email")

    return (
        <></>
    )
}


export default ResetPassPages