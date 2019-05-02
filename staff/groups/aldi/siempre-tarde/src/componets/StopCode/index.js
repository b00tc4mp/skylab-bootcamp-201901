import React from 'react'
import literals from './literals'
import { Link } from "react-router-dom"
import logic from '../../logic';

function StopCode({lang, onSearch, error}) {
    const {title, stop, submit, reset,back} = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            stop_id : {value: stop_id},
        } = e.target
        let number = parseInt(stop_id,10);

        onSearch(number)


    }


    return <section>
    <Link to={`/`}><button>{back}</button></Link>
    <h2>{title}</h2>
        <form onSubmit= {handleSubmit}>
            <input type="number" name="stop_id" placeholder={stop} autoFocus/>
            <input type="submit" value={submit}/>
            <input type="reset" value={reset}/>
        </form>
        <h2>{error}</h2>
    </section>

}
export default StopCode