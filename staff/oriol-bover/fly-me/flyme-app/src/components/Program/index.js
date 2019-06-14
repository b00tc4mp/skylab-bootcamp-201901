import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'

export default function Programs({ userId, history }) {
    const [programs, setPrograms] = useState(null)
    const [feedback, setFeedback] = useState(null)


    useEffect(() => {
        (async function () {
            try {
                return logic.retrievePrograms(userId)
                    .then(programs => setPrograms(programs))
                    .catch(err => setFeedback(err.message))
            } catch ({ message }) {
                setFeedback(message)
            }
        })();
    }, []);


    function createProgram(e) {
        e.preventDefault()

        history.push('/admin/program/create')
    }

    function onProgramDetail(programId) {
        console.log(programId)

        history.push(`/admin/${programId}/program`)
    }

    return (<section className="section">
        <h1 className="title section--title">{userId ? 'YOUR PROGRAMS' : 'PROGRAMS'}</h1>
        {userId && <button className="button program--add" onClick={e => createProgram(e)} >Add Program</button>}
        <div className="columns is-multiline">
            {programs && programs.map(program => <div className="column is-4-desktop has-text-centered">
                <div className="box program" key={program.id} onClick={() => onProgramDetail(program._id)}>
                    <h2 className="program--title">{program.name}</h2>
                    {!userId && <span className="program--name">by <small>{program.userId.name} {program.userId.surname}</small></span>}
                    {program.orders.length > 2 && < ul className="program--orders">
                        <strong className="program--orders__title">COMMANDS</strong>
                        <li className="program--orders__item">{program.orders[0].content}</li>
                        <li>{program.orders[1].content}</li>
                        <li>...</li>
                    </ul>}
                </div>
            </div>)}
        </div>
    </section>)
}