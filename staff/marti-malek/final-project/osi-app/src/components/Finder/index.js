import React, { useRef, useState, useEffect } from 'react'
// import logic from '../../logic'
import './index.sass'

function Finder({ content, close, drag, dragDown, closeDrag, elementDrag }) {

    let finder = useRef()
    let [pos1, setPos1] = useState(null)
    let [pos2, setPos2] = useState(null)
    let [pos3, setPos3] = useState(null)
    let [pos4, setPos4] = useState(null)

    useEffect(() => {

    },[])
    
    drag = (element) => {
        if (finder.current) {
            finder.current.onMouseDown = dragDown
        } else {
            element.onMouseDown = dragDown
        }
    }

    // drag(finder.current)

    dragDown = (e) => {
        e.preventDefault()
        debugger
        setPos3(e.clientX)
        setPos4(e.clientY)
        document.onMouseUp = closeDrag
        document.onMouseMove = elementDrag
    }

    elementDrag = (e) => {
        e.preventDefault()

        setPos1(pos3 - e.clientX)
        setPos2(pos4 - e.clientY)
        setPos3(e.clientX)
        setPos4(e.clientY)

        finder.current.style.top = (finder.current.offsetTop - pos2) + 'px'
        finder.current.style.left = (finder.current.offsetTop - pos1) + 'px'
    }

    closeDrag = () => {
        document.onMouseUp = null
        document.onMouseMove = null
    }

    return <section className="finder" id="finder" draggable ref={finder} /* onDrag={(e) => drag(e.target)} */>
        <header className="finder__header" id="finder-header"><i class="fas fa-times" onClick={close}></i></header>
        {content.map(item => {
            return <div className="finder__item">{item}</div>
        })}
    </section>
}

export default Finder