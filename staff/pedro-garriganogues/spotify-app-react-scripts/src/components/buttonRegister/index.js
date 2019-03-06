import React from 'react'

class ButtonRegister extends React.Component {
    constructor() {
        super()
    }

    changeToRegister = event => {
        event.preventDefault()
        this.props.onRegister()
    }

    render() {
        return <section className="d-flex justify-content-center">
            < button onClick={this.changeToRegister} className="btn"> Register</button >
        </section >
    }
}

export default ButtonRegister