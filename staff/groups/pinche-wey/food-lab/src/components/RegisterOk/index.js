import React from 'react'
import literals from './literals'

function RegisterOk({ onLogin }) {
    return <>
        Registration Succeded <a href="" onClick={e => {
            e.preventDefault()

            onLogin()
        }}>Login</a>.
    </>
}

export default RegisterOk