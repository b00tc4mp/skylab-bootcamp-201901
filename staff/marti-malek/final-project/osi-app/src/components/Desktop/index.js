import React, { useEffect, useState } from 'react'
import Toolbar from '../Toolbar'
import Clock from '../Clock'
import Todos from '../Todos'
import Dragzone from '../Dragzone'
import logic from '../../logic'
import './index.sass'

function Desktop({ handleState, handleNewFolder, handleNewFile }) {

    let [level, setLevel] = useState([])
    let [positions, setPositions] = useState([])
    // let positionsTest

    useEffect(() => {
        handleState()
    }, [])

    handleState = () => {
        return logic.retrieveFile('.position.json')
            .then(positionsArray => setPositions(positionsArray))
            .then(() => logic.retrieveDir('/'))
            .then(dir => {
                setLevel(dir)
            })
    }

    handleNewFolder = () => {
        return logic.createDir('/.newFolder')
            .then(() => logic.retrieveFile('.position.json'))
            .then(oldPositions => {
                let count = 0
                let newPositions = oldPositions.map((position, index) => {
                    if (count > 0) return position
                    if (position.type === null) {
                        count++
                        return { position: index, type: 'folder', name: '.newFolder' }
                    } else {
                        return position
                    }
                })
                return newPositions
            })
            .then((newPositions) => logic.updatePositions(newPositions))
            .then(() => handleState())
    }

    handleNewFile = () => {
        console.log('new file huhu')
    }

    return <section className="desktop">
        <div className="desktop__clock">
            <Clock></Clock>
        </div>
        <div className="desktop__todos">
            <Todos></Todos>
        </div>
        <div className="desktop__toolbar">
            <Toolbar newFolder={handleNewFolder} newFile={handleNewFile}></Toolbar>
        </div>
        <div className="desktop__dragzone">
            <Dragzone dir={level} pos={positions}></Dragzone>
        </div>
    </section>
}

export default Desktop