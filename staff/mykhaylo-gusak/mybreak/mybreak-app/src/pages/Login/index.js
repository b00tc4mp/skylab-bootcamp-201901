import React, { useState } from 'react'

import Input from '../../components/Input'
import Button from '../../components/Button'
import TitleOne from '../../components/TitleOne'
import LayoutPrimary from '../../components/LayoutPrimary'
import LayoutSecundary from '../../components/LayoutSecundary'
import CloserX from '../../components/CloserX'
import FormSugesstion from '../../components/FormSugesstion'
import ErrorMessage from '../../components/ErrorMessage'

import logic from '../../logic/index.js'

import '../../../node_modules/bulma/bulma.sass'
import './index.sass'

function Login({ closeLogin, handleRetrieveUser }) {

    const [showError, setErrorMessage] = useState(false);

    function handleSubmit(event) {

        event.preventDefault()

        const email = document.getElementsByName("email")[0].value
        const password = document.getElementsByName("password")[0].value

        return (async () => {
            try {
                await logic.loginUser(email, password)
                handleRetrieveUser()
            } catch (error) {
                setErrorMessage(error.message)
            }
        })()
    }

    return (<>
        <CloserX close={closeLogin} />
        <form>
            <TitleOne text={'Log in Mybreak'} />
            <LayoutPrimary />
            <Input email={true} />
            <LayoutSecundary />
            <Input password={true} />
            <LayoutPrimary />
            {showError && <ErrorMessage message={showError} />}
            <Button primary={true} accept={true} click={handleSubmit} />
        </form>
        <FormSugesstion login={true} />
    </>);
}

export default Login