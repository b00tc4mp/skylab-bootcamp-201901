import React, { useEffect } from 'react'
import './index.sass'

export default function Terminal({ history }) {

    useEffect(() => {
        console.log('history in terminal', history)
    }, [history.join(',')])

    return (<div className="columns">
        <div className="column">
            <h1 className="title">TERMINAL</h1>
            <section className="block terminal">
                {history && history.map(hist => <pre className="terminal--output"><output>{hist.date} - DRONE: {hist.response} </output></pre>)}
            </section>
        </div>
    </div>)
}