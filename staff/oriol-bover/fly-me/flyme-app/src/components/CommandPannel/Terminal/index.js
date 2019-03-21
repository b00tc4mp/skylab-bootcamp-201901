import React, { useEffect } from 'react'
import './index.sass'

export default function Terminal({ history }) {

    useEffect(() => {
        console.log('history in terminal', history)
    }, [history.join(',')])

    return (<div className="columns">
        <div className="column">
            <h1 className="title section--title">COMMAND PANEL</h1>
            <section className="block terminal" id="terminal">
                {history && history.map(hist => <pre className="terminal--output"><output>{hist.date} - DRONE: {hist.response} </output></pre>)}
            </section>
        </div>
    </div>)
}