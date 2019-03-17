import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
// import Hammer from 'hammerjs'
import logic from '../../logic';

function Dragzone({ onDragStart, onDrop, allowDrop, dir, handleDivs, pos, changeName, handleName, onTrashDrop, checkNews, openDir, refresh, openFile, dragItem }) {

    let [divs, setDivs] = useState(new Array(48).fill(null))
    // // let [newName, setNewName] = useState(null)
    let newNameTest = null
    let oldNameTest

    // let i = 0

    let draggableTest
    let droppingTest

    let dragzone = useRef()
    // let inputRef = useRef()

    useEffect(() => {
        checkNews()
        handleDivs()
    }, [dir])

    // useEffect(() => {
    //     checkNews()
    // }, [divs])

    checkNews = () => {
        if (document.querySelector('#inputId')) {
            var elems = document.querySelectorAll('#inputId')
            elems.forEach(elem => {
                if (elem.innerHTML === "_newFile.txt" || elem.innerHTML === "_newFolder") {
                    elem.addEventListener('click', e => {
                        return changeName(e)
                    })
                    elem.click()
                }
            })
        }
    }

    handleName = (e, parent, input) => {
        newNameTest = e.target.value
        let elems = document.querySelectorAll('#inputId')
        elems.forEach(elem => {
            if (elem.innerText === e.target.value) throw Error(`Element with name ${e.target.value} already exists`)
        })
        return logic.rename(oldNameTest, newNameTest)
            .then(() => handleDivs())
    }

    changeName = (e) => {
        if (e.target.localName === "input") return
        oldNameTest = e.target.firstChild.innerText ? e.target.firstChild.innerText : e.currentTarget.firstChild.id == "folder" ? '_newFolder' : e.currentTarget.firstChild.data === "_newFolder" ? e.currentTarget.firstChild.data : '_newFile.txt'
        // e.target.childNodes.forEach(child => {
        //     oldNameTest = child.data ? child.data : child.innerText !== "" ? child.innerText : e.currentTarget.firstChild.id == "folder" ? '_newFolder' : '_newFile.txt'
        //     // oldNameTest = child.data !== undefined ? child.data : child.innerText !== "" ? child.innerText : '.newFolder' // TODO
        // })
        let newInput = document.createElement('input')
        newInput.name = "newName"
        newInput.type = "text"
        newInput.id = "inputId"
        newInput.className = "nameInput"
        newInput.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                handleName(e, e.target.parentElement, newInput)
            }
        })
        if (e.target.className === "nameInput") return
        e.target.replaceChild(newInput, e.target.firstChild)
        return newInput.focus()
    }

    onDragStart = ev => {
        draggableTest = ev.target
        ev.dataTransfer.setData("text/plain", ev.target.firstChild.innerText ? ev.target.firstChild.innerText : ev.target.firstChild.firstChild.innerText)
    }

    allowDrop = async ev => {
        ev.preventDefault()
        droppingTest = ev.target
    }

    onTrashDrop = ev => {
        let name = ev.dataTransfer.getData("text")
        if (draggableTest.id === "folder") {
            return logic.removeDir(name)
                .then(() => handleDivs())
        } else {
            return logic.removeFile(name)
                .then(() => handleDivs())
        }
    }

    onDrop = ev => {
        ev.preventDefault();
        console.log(dragItem)
        debugger
        if (draggableTest.id === "file" && droppingTest.id === "folder") {
            let oldPath = draggableTest.firstChild.innerText
            let newPath = droppingTest.firstChild.innerText + '/' + oldPath
            return logic.moveFile(oldPath, newPath)
                .then(() => handleDivs())
        } else if (draggableTest.id === "folder" && droppingTest.id === "folder") {
            if (draggableTest === droppingTest) {
                return
            } else {
                let oldPath = '/' + draggableTest.firstChild.innerText
                let newPath = '/' + droppingTest.firstChild.innerText + oldPath
                return logic.moveDir(oldPath, newPath)
            }
        } else if (draggableTest.id === "folder" && droppingTest.id === "file") {
            console.error('Cannot move a folder into a file')
            return
        } else if (draggableTest.id === "file" && droppingTest.id === "file") {
            console.error('Cannot move a file into a file')
            return
        } else {
            return logic.updatePositions(draggableTest.firstChild.innerText, Number(droppingTest.id))
                .then(() => handleDivs())
        }

    }

    handleDivs = () => {
        refresh()
        return logic.retrieveLevel('/')
            .then(positions => pos = positions.children)
            .then(() => {
                setDivs(divs.map((div, index) => {
                    let position = pos.find(e => e.position == index)
                    if (position) {
                        if (position.type === 'folder') {
                            return <div className="droppable" key={index} keys={index} id={index} /* onClick={(e) => changeName(e)} */ onDoubleClick={(e) => openDir(e)} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}>
                                <span id={position.type} keys={`span${index}`} className="fas fa-folder fa-3x dragzone__folder" draggable="true" onDragStart={(e) => onDragStart(e)}>
                                    <p className="name" id="inputId">{`${position.name}`}</p>
                                </span>
                            </div>
                        } else if (position.type === 'file') {
                            return <div className="droppable" key={index} keys={index} id={index} /* onClick={(e) => changeName(e)} */ onDoubleClick={(e) => openFile(e)} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}>
                                <span id={position.type} keys={`span${index}`} className="fas fa-file fa-3x dragzone__folder" draggable="true" onDragStart={(e) => onDragStart(e)}>
                                    <p className="name" id="inputId">{position.name}</p>
                                </span>
                            </div>
                        } else {
                            return <div className="droppable" key={index} keys={index} id={index} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}><span></span></div>
                        }
                    } else if (index === 47) {
                        return <div className="droppable" key={index} keys={index} id={index} onDrop={(e) => onTrashDrop(e)} onDragOver={(e) => allowDrop(e)}><span className="fas fa-trash-alt fa-2x"></span></div>
                    } else {
                        return <div className="droppable" key={index} keys={index} id={index} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}><span></span></div>
                    }
                }))
            })
    }

    return <section className="dragzone" ref={dragzone}>
        {divs}
    </section>
}

export default Dragzone