import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
import logic from '../../logic';

function Dragzone({ onDragStart, onDrop, allowDrop, dir, handleDivs, pos }) {

    let [divs, setDivs] = useState(new Array(48).fill(null))

    let i = 0

    let draggableTest
    let droppingTest

    let dragzone = useRef()

    useEffect(() => {
        handleDivs()
    }, [dir])

    handleDivs = () => {

        setDivs(divs.map((div, index) => {
            if (pos[index]) {
                if (pos[index].type === 'folder') {
                    return <div className="droppable" key={index} keys={index} id={`div${index}`} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}>
                        <span id={pos[index].type} keys={`span${index}`} className="fas fa-folder fa-3x dragzone__folder" draggable="true" onDragStart={(e) => onDragStart(e)}>
                            <p className="name">{`${dir[i++]}`}</p>
                        </span>
                    </div>
                } else if (pos[index].type === 'file') {
                    return <div className="droppable" key={index} keys={index} id={`div${index}`} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}>
                        <span id={pos[index].type} keys={`span${index}`} className="fas fa-file fa-3x dragzone__folder" draggable="true" onDragStart={(e) => onDragStart(e)}>
                            <p className="name">{`${dir[i++]}`}</p>
                        </span>
                    </div>
                } else {
                    return <div className="droppable" key={index} keys={index} id={`div${index}`} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}><span></span></div>
                }
            } else {
                return <div className="droppable" key={index} keys={index} id={`div${index}`} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}><span></span></div>
            }
        }))
    }


    onDragStart = ev => {
        draggableTest = ev.target
    }

    allowDrop = async ev => {
        ev.preventDefault()
        droppingTest = ev.target.id
    }

    onDrop = ev => {
        ev.preventDefault();
        let droppableElems = document.querySelectorAll(".droppable")

        var dropArr = [...droppableElems]
        dropArr.map((dropElem, index) => {
            if (dropArr[index].id === droppingTest) {
                if (dropArr[index].firstChild === null) dropArr[index].appendChild(document.createElement('span'))
                dropArr[index].replaceChild(draggableTest, dropArr[index].firstChild)
            }
        })

        let newPositions = dropArr.map((elem, index) => {
            if (elem.firstChild) {
                if (elem.firstChild.id) {
                    return {position: index, type: elem.firstChild.id}
                } else return {position: null, type: null}
            } else {
                return {position: null, type: null}
            }
        })
        return logic.updatePositions(newPositions)
    }


    return <section className="dragzone" ref={dragzone}>
        {divs}
    </section>
}

export default Dragzone