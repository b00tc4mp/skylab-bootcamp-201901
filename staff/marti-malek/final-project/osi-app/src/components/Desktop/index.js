import React, { useEffect, useState } from 'react'
import Toolbar from '../Toolbar'
import Clock from '../Clock'
import Todos from '../Todos'
import Dragzone from '../Dragzone'
import File from '../File'
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
        return logic.retrieveLevel()
            .then(positionsArray => {
                setPositions(positionsArray.children)
            })
            .then(() => logic.retrieveDir('/'))
            .then(dir => {
                setLevel(dir)
            })
    }

    handleNewFolder = () => {
        return logic.createDir('/_newFolder')
            .then(() => logic.retrieveLevel())
            .then(newPositions => {
                setLevel(newPositions.children)
            })
            .then(() => handleState())
    }

    handleNewFile = () => {
        let fileContent = {
            type: ".txt",
            content: ""
        }
        return logic.createFile(fileContent,'/_newFile')
            .then(() => logic.retrieveLevel())
            .then(newPositions => {
                setLevel(newPositions.children)
            })
            .then(() => handleState())
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