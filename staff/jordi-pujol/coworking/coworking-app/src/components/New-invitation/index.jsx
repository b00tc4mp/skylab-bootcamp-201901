import React from 'react'

function NewInvitation ({invitation}) {


    return <section>
        <p>You can provide this url to a new user and they will automatically login in this workspace</p>
        <label>http://localhost:3000/#/login/{invitation}</label>
    </section>
}

export default NewInvitation