import React from 'react'
import literals from './literals'

function RegisterOk({ lang, onLogin }) {
    const { successProceedTo, login } = literals[lang]

    return <>
        {successProceedTo} <a href="" onClick={e => {
            e.preventDefault()

            onLogin()
        }}>{login}</a>.
    </>
}

export default RegisterOk