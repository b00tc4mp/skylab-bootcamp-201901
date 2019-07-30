import React, { useState } from 'react'
import logic from '../../logic'

import Input from '../../components/Input'
import Button from '../../components/Button'
import TitleOne from '../../components/TitleOne'
import LayoutPrimary from '../../components/LayoutPrimary'
import LayoutSecundary from '../../components/LayoutSecundary'
import CloserX from '../../components/CloserX'
import FormSugesstion from '../../components/FormSugesstion'
import ErrorMessage from '../../components/ErrorMessage'

import '../../../node_modules/bulma/bulma.sass'
import './index.sass'

function Register({ handleCloseRegister, handleUserRegistered, handleOpenLogin }) {
    const [showError, setErrorMessage] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault()

        const email = document.getElementsByName("email")[0].value
        const password = document.getElementsByName("password")[0].value
        const name = document.getElementsByName("name")[0].value
        const surname = document.getElementsByName("surname")[0].value
        const age = 20

        return (async () => {
            try {
                await logic.registerUser(name, surname, email, password, age)
                handleUserRegistered()
            } catch (error) {
                setErrorMessage(error.message)
            }
        })()
    }

    return (<>
        <CloserX close={handleCloseRegister} />
        <form>
            <TitleOne text={'Sign in Mybreak'} />
            <LayoutPrimary />
            <Input email={true} />
            <LayoutSecundary />
            <Input password={true} />
            <LayoutSecundary />
            <Input name={true} />
            <LayoutSecundary />
            <Input surname={true} />
            <LayoutPrimary />
            {showError && <ErrorMessage message={showError} />}
            <Button primary={true} accept={true} click={handleSubmit} />
        </form>
        <FormSugesstion register={true} click={handleOpenLogin} />
    </>);
}


export default Register;