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

    }, [content])

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
        <header className="finder__header" id="finder-header"><i className="fas fa-times" onClick={close}></i>
        <p>
            {content.name}
        </p></header>
        <section className="finder__content">
            <section className="finder__list">
                {content.children.map((item, index) => {
                    if (item.type === "folder") {
                        return <div className="finder__item" key={index}>
                            <i className="fas fa-folder"></i>
                            <p>
                                {item.name}
                            </p>
                        </div>
                    } else {
                        return <div className="finder__item" key={index}>
                            <i className="fas fa-file"></i>
                            <p>
                                {item.name}
                            </p>
                        </div>
                    }
                })}
            </section>
            <div className="finder__divider"></div>
            {
                content.children.length > 0 ?
                    <section className="finder__dragzone">
                        {
                            content.children.map((item, index) => {
                                if (item.type === "folder") {
                                    return <div className="finder__dragzone__item" key={index}>
                                        <i className="fas fa-folder fa-3x"></i>
                                        <p>
                                            {item.name}
                                        </p>
                                    </div>
                                } else {
                                    return <div className="finder__dragzone__item" key={index}>
                                        <i className="fas fa-file fa-2x"></i>
                                        <p>
                                            {item.name}
                                        </p>
                                    </div>
                                }
                            })
                        }
                    </section>
                    : <section className="finder__empty"><p>No Files Found</p></section>
            }
        </section>
    </section>
}

export default Finder