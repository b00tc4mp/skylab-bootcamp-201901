import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
// import Hammer from 'hammerjs'
import logic from '../../logic';
import { debug } from 'util';

function Dragzone({ onDragStart, onDrop, allowDrop, dir, handleDivs, pos, changeName, handleName, onTrashDrop, checkNews, openDir, openFile, dragItem }) {

    let [divs, setDivs] = useState(new Array(48).fill(null))
    let [newName, setNewName] = useState(null)
    let oldNameTest
    let draggableTest
    let droppingTest

    let dragzone = useRef()

    useEffect(() => {
        checkNews()
        handleDivs()
    }, [dir])

    useEffect(() => {
        handleDivs()
    }, [newName])

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

    handleName = e => {
        newName = e.target.value
        setNewName(e.target.value)
        let elems = document.querySelectorAll('#inputId')
        elems.forEach(elem => {
            if (elem.innerText === e.target.value) throw Error(`Element with name ${e.target.value} already exists`)
        })
        return logic.rename(oldNameTest, newName)
            .then(() => handleDivs())
    }

    changeName = (e) => {
        if (e.target.parentElement === "null" || e.target.parentElement === null) return
        oldNameTest = e.target.firstChild.data
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
        e.target.parentElement.replaceChild(newInput, e.target)
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

    useEffect(() => {
        if (dragItem) {
            onDrop(null, dragItem)
        }
    }, [dragItem])

    onDrop = (ev, dropItem) => {
        if (ev) ev.preventDefault();
        if (dropItem === undefined) {
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
                        .then(() => handleDivs())
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
        } else {
            if (dropItem[1] === "folder") {
                let newFolderName = dropItem[0].split('/').reverse()[0]
                let newFolderPath = '/' + newFolderName
                return logic.moveDir(dropItem[0], newFolderPath)
                    .then(() => handleDivs())
            } else if (dropItem[1] === "file") {
                let newFileName = dropItem[0].split('/').reverse()[0]
                let newFilePath = '/' + newFileName
                return logic.moveFile(dropItem[0], newFilePath)
                    .then(() => handleDivs())
            }
        }
    }

    handleDivs = () => {
        return logic.retrieveLevel('/')
            .then(positions => pos = positions.children)
            .then(() => {
                setDivs(divs.map((div, index) => {
                    let position = pos.find(e => e.position == index)
                    if (position) {
                        if (position.type === 'folder') {
                            return <div className="droppable" key={index} keys={index} id={index} onDoubleClick={(e) => openDir(e)} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}>
                                <span id={position.type} keys={`span${index}`} className="fas fa-folder fa-3x dragzone__folder" draggable="true" onDragStart={(e) => onDragStart(e)}>
                                    <p className="name" id="inputId" onClick={(e) => changeName(e)}>{`${position.name}`}</p>
                                </span>
                            </div>
                        } else if (position.type === 'file') {
                            return <div className="droppable" key={index} keys={index} id={index} onDoubleClick={(e) => openFile(e)} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}>
                                <span id={position.type} keys={`span${index}`} className="fas fa-file fa-3x dragzone__folder" draggable="true" onDragStart={(e) => onDragStart(e)}>
                                    <p className="name" id="inputId" onClick={(e) => changeName(e)}>{position.name}</p>
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