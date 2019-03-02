import React, { Component } from 'react'

class Landing extends Component {

    onGoToLogin = e => {
        e.preventDefault()

        const { props: { goToLogin } } = this

        goToLogin()
    }

    render() {
        const { onGoToLogin } = this
        return <section>
            <h1>Welcome to OSI</h1>
            <button onClick={onGoToLogin}>Login</button>
        </section>
    }
}

export default Landing