import React, { useRef, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'

function Finder({ content, close, dragStart, drag, dragDown, closeDrag, elementDrag, openFolder, openFile, openFileFromFinder }) {

    let finder = useRef()
    let [pos1, setPos1] = useState(null)
    let [pos2, setPos2] = useState(null)
    let [pos3, setPos3] = useState(null)
    let [pos4, setPos4] = useState(null)
    let [previousPath, setPreviousPath] = useState(null)
    let [finderContent, setFinderContent] = useState(content)

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

    openFolder = e => {
        let folderPath
        // console.log(e.target.querySelector('p'))
        debugger
        if (previousPath) {
            folderPath = previousPath + '/' + e.target.innerText
        } else {
            folderPath = '/' + e.target.innerText
        }
        folderPath.replace('↵', '')
        setPreviousPath(folderPath)
        return logic.retrieveLevel(folderPath)
            .then(newContent => {
                setFinderContent(newContent)
            })
    }

    openFile = e => {
        let filePath
        debugger
        if (previousPath) {
            filePath = previousPath + '/' + e.target.innerText
        } else {
            filePath = '/' + e.target.innerText
        }
        filePath.replace('↵', '')
        setPreviousPath(filePath)
        openFileFromFinder(filePath)
        // return logic.retrieveFile(folderPath)
        //     .then(newContent => {
        //         openFileFromFinder(newContent)
        //     })
    }

    return <section className="finder" id="finder" draggable ref={finder} /* onDrag={(e) => drag(e.target)} */>
        <header className="finder__header" id="finder-header"><i className="fas fa-times" onClick={close}></i>
            <p>
                {finderContent.name}
            </p>
        </header>
        <section className="finder__content">
            <section className="finder__list">
                {finderContent.children.map((item, index) => {
                    if (item.type === "folder") {
                        return <div className="finder__item" key={index} onClick={(e) => openFolder(e)}/* onDragStart={e => dragStart(e)} */>
                            <i className="fas fa-folder"></i>
                            <p>
                                {item.name}
                            </p>
                        </div>
                    } else {
                        return <div className="finder__item" key={index} onClick={(e) => openFile(e)}/* onDragStart={e => dragStart(e)} */>
                            <i className="fas fa-file"></i>
                            <p>
                                {item.name}
                            </p>
                        </div>
                    }
                })}
            </section>
            {/* <div className="finder__divider"></div> */}
            {
                finderContent.children.length > 0 ?
                    <section className="finder__dragzone">
                        {
                            finderContent.children.map((item, index) => {
                                if (item.type === "folder") {
                                    return <div className="finder__dragzone__item" id={item.type} key={index} draggable onDragStart={e => dragStart(e)}>
                                        <i className="fas fa-folder fa-3x"></i>
                                        <p>
                                            {item.name}
                                        </p>
                                    </div>
                                } else {
                                    return <div className="finder__dragzone__item" id={item.type} key={index} draggable onDragStart={e => dragStart(e)}>
                                        <i className="fas fa-file fa-3x"></i>
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