import React, { useRef, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'

function Finder({ content, close, dragStart, drag, dragDown, closeDrag, elementDrag, openFolder, openFile, openFileFromFinder, onDragStart, onDrag, dragEnd }) {

    let finder = useRef()
    let [previousPath, setPreviousPath] = useState(null)
    let [finderContent, setFinderContent] = useState(content)
    let [topPosition, setTopPosition] = useState(null)
    let [leftPosition, setLeftPosition] = useState(null)
    let posX
    let posY

    useEffect(() => {

    }, [content])

    openFolder = e => {
        let folderPath
        if (previousPath) {
            folderPath = previousPath + '/' + e.target.innerText
        } else {
            folderPath = '/' + e.target.innerText
        }
        folderPath = folderPath.split('')
        let filteredPath = folderPath.filter(char => char !== '↵' && char !== '\n').join('')
        setPreviousPath(filteredPath)
        return logic.retrieveLevel(filteredPath)
            .then(newContent => {
                setFinderContent(newContent)
            })
    }

    openFile = e => {
        let filePath
        if (previousPath) {
            filePath = previousPath + '/' + e.target.innerText
        } else {
            filePath = '/' + e.target.innerText
        }
        // filePath.replace('↵', '')
        filePath = filePath.split('')
        let filteredPath = filePath.filter(char => char !== '↵' && char !== '\n').join('')
        setPreviousPath(filteredPath)
        openFileFromFinder(filteredPath)
        // return logic.retrieveFile(folderPath)
        //     .then(newContent => {
        //         openFileFromFinder(newContent)
        //     })
    }
    onDragStart = e => {
        posX = e.clientX
        posY = e.clientY
    }

    onDrag = e => {
        let right = posX - e.clientX
        let top = posY - e.clientY
        posX = e.clientX
        posY = e.clientY
        e.target.style.top = (e.target.offsetTop - top) + 'px'
        e.target.style.left = (e.target.offsetLeft - right) + 'px'
        // setTopPosition((e.target.offsetTop - top) + 'px')
        // setLeftPosition((e.target.offsetLeft - right) + 'px')
    }

    // dragEnd = e => {
    //     debugger
    //     e.target.style.top = topPosition
    //     e.target.style.left = leftPosition
    // }

    return <section className="finder" id="finder" draggable ref={finder} onDrag={e => onDrag(e)} onDragStart={e => onDragStart(e)} /* onMouseUp={(e) => dragEnd(e)} */>
        <header className="finder__header" id="finder-header"><i className="fas fa-times" onClick={close}></i>
            <p>
                {finderContent.name}
            </p>
        </header>
        <section className="finder__content">
            {
                finderContent.children.length > 0 ?
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
                    : null
            }
            {
                finderContent.children.length > 0 ?
                    <section className="finder__dragzone">
                        {
                            finderContent.children.map((item, index) => {
                                if (item.type === "folder") {
                                    return <div className="finder__dragzone__item" id={item.type} key={index} draggable onDragStart={e => dragStart(e)} /* onDragEnd={e => dragEnd(e)} */>
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