import React, {useContext} from 'react'
import { DemoContext } from '../DemoContext'

export default function Context() {

    const { email, password, characters } = useContext(DemoContext)

    return (
    <div>
        <h1>Hi, my email is <b>{email}</b> and my password is <b>{password}</b>.</h1>
        {characters && <h1> And I love this Marvel character: <b>{characters[0].name}</b>.</h1>}
    </div>
    )
}