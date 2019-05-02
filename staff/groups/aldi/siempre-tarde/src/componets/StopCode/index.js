import React from 'react'
import literals from './literals'
import { Link } from "react-router-dom"
import logic from '../../logic'
import './index.sass'

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


    return <section className='main-stopcode'>
     <div className='stopcode-container'>
        <Link to={`/`}><button className="button is-rounded is-primary is-outlined">{back}</button></Link>
        <h2 className='title'>{title}</h2>
        <form onSubmit= {handleSubmit}>
                <input className="input field" type="number" name="stop_id" placeholder={stop} autoFocus/>
                <input className="button is-rounded is-primary" type="submit" value={submit}/>
                <input className="button is-rounded is-primary" type="reset" value={reset}/>
        </form>
        <span className="help is-danger">{error}</span>
    </div>
    </section>

}
export default StopCode