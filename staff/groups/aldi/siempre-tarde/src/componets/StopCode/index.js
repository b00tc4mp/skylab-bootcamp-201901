import React from 'react'
import literals from './literals'

function StopCode({lang, onLogin}) {
    const {title, stop, submit, reset} = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            stop_id : {value: stop_id},
        } = e.target

        onLogin(stop_id)
    }


    return <section>

    <h2>{title}</h2>
        <form onSubmit= {handleSubmit}>
            <input type="number" name="stop_id" placeholder={stop} autoFocus/>
            <input type="submit" value={submit}/>
            <input type="reset" value={reset}/>
        </form>
    </section>

}
export default StopCode