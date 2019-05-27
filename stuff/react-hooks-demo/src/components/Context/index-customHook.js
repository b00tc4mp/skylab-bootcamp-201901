import React, {useContext} from 'react'
import { DemoContext } from '../DemoContext'
import useCustomHook from '../CustomHook'

export default function Context() {

    const {isShowing, toggle} = useCustomHook()

    const { email, password, characters } = useContext(DemoContext)

    return (
    <div>
        <h1>Hi, my email is <b>{email}</b> and my password is <b>{password}</b>.</h1>
        <button onClick={toggle}>Show Marvel Character</button>
        {isShowing && characters && <h1> And I love this Marvel character: <b>{characters[0].name}</b>.</h1>}
    </div>
    )
}