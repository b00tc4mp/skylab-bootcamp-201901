import React, { useEffect, useState } from 'react'
import Toolbar from '../Toolbar'
import Clock from '../Clock'
import Todos from '../Todos'
import Dragzone from '../Dragzone'
import logic from '../../logic'
import './index.sass'

function Desktop({ handleState }) {

    let [level, setLevel] = useState([])
    let [positions, setPositions] = useState([])
    // let positionsTest

    useEffect(() => {
        handleState()
    }, [])

    handleState = () => {
        return logic.retrieveFile('.position.json')
            .then(positionsArray => {
                setPositions(positionsArray)
            })
            .then(() => logic.retrieveDir('/'))
            .then(dir => {
                setLevel(dir)
            })
    }

    return <section className="desktop">
        <div className="desktop__clock">
            <Clock></Clock>
        </div>
        <div className="desktop__todos">
            <Todos></Todos>
        </div>
        <div className="desktop__toolbar">
            <Toolbar></Toolbar>
        </div>
        <div className="desktop__dragzone">
            <Dragzone dir={level} pos={positions}></Dragzone>
        </div>
    </section>
}

export default Desktop