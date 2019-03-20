import React from 'react'

function NewInvitation({ invitation }) {


    return <section className="invitation">
        <div className="invitation__content">
            <p className="invitation__content--send">You can provide this url to a new user and they will automatically login in this workspace:</p>
            <a className="invitation__content--link">http://localhost:3000/#/login/{invitation}</a>
        </div>
    </section>
}

export default NewInvitation