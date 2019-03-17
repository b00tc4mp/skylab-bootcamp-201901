import React, { useState, useEffect } from 'react'
import logic from '../../logic'

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

    function onProgramDetail(programId){
        console.log(programId)

        history.push(`/admin/${programId}/program`)
    }

    return (<section className="section">
        <div className="columns">
            <div className="column">
                <h1 className="title">{userId ? 'YOUR PROGRAMS' : 'PROGRAMS'}</h1>
                {userId && <button className="button" onClick={e => createProgram(e)} >Add Program</button>}
                {programs && programs.map(program => <div className="box" key={program.id} onClick={() => onProgramDetail(program._id)}>
                    <p>{program.name}</p>
                </div>)}
            </div>
        </div>
    </section>)
}