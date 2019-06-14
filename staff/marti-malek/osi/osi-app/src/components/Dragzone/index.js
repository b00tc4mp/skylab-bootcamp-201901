import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
import logic from '../../logic';

function Dragzone({ onDragStart, onDrop, allowDrop, dir, handleDivs, pos, changeName, handleName, onTrashDrop, checkNews, openDir, openFile, dragItem, setDragzoneError, changeItems }) {

    let [divs, setDivs] = useState(new Array(48).fill(null))
    let [newName, setNewName] = useState(null)
    let [itemChanged, setItemChanged] = useState(null)
    let oldNameTest
    let draggableTest
    let droppingTest

    const dragzone = useRef()

    useEffect(() => {
        checkNews()
        handleDivs()
    }, [dir])

    // useEffect(() => {
    //     debugger
    //     changeItems(itemChanged)
    // }, [itemChanged])

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

    handleName = (e, input) => {
        newName = e.target.value
        setNewName(e.target.value)
        let elems = document.querySelectorAll('#inputId')
        elems.forEach(elem => {
            if (elem.innerText === e.target.value) return setDragzoneError(`Item with name ${e.target.value} already exists`)
        })
        // HUGE ERROR
        // let newP = document.createElement('p')
        // newP.name = "name"
        // newP.id = "inputId"
        // newP.className = "name"
        // newP.addEventListener('click', e => {
        //         changeName(e, newP)
        // })
        return logic.rename(oldNameTest, newName)
            .then(() => handleDivs())
            .then(() => {
                // newP.innerText = newName
                // return input.parentElement.replaceChild(newP, input)
                return window.location.reload()
            })
            .catch(err => {
                debugger
                setDragzoneError('There has been an error while renaming')
            })
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
                handleName(e, newInput)
            }
        })
        if (e.target.className === "nameInput") return
        e.target.parentElement.replaceChild(newInput, e.target)
        return newInput.focus()
    }

    onDragStart = ev => {
        draggableTest = ev.target
        if (!ev.target.firstChild.innerText && !ev.target.firstChild.firstChild) {
            setDragzoneError('Please name the item before moving it.')
            return
        }
        ev.dataTransfer.setData("text/plain", ev.target.firstChild.innerText ? ev.target.firstChild.innerText : ev.target.firstChild.firstChild.innerText)
    }

    allowDrop = async ev => {
        ev.preventDefault()
        if (ev.target.id !== "inputId") {
            droppingTest = ev.target
        } else {
            droppingTest = ev.target.parentElement
        }
    }

    onTrashDrop = ev => {
        let name = ev.dataTransfer.getData("text")
        if (!name) return setDragzoneError('Cannot remove unnamed items')
        if (draggableTest.id === "folder") {
            return logic.removeDir(name)
                .then(() => handleDivs())
                .catch(err => {
                    return setDragzoneError(err)
                })
        } else {
            return logic.removeFile(name)
                .then(() => handleDivs())
                .catch(err => {
                    return setDragzoneError(err)
                })
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
            if (!draggableTest) return
            if (draggableTest.id === "file" && droppingTest.id === "folder") {
                let oldPath = draggableTest.firstChild.innerText
                let newPath = droppingTest.firstChild.innerText + '/' + oldPath
                return logic.moveFile(oldPath, newPath)
                    .then(() => handleDivs())
                    .catch(err => setDragzoneError(err))
            } else if (draggableTest.id === "folder" && droppingTest.id === "folder") {
                if (draggableTest === droppingTest) {
                    return setDragzoneError('Cannot move a folder into itself')
                } else {
                    let oldPath = '/' + draggableTest.firstChild.innerText
                    let newPath = '/' + droppingTest.firstChild.innerText + oldPath
                    return logic.moveDir(oldPath, newPath)
                        .then(() => handleDivs())
                        .catch(err => setDragzoneError(err))
                }
            } else if (draggableTest.id === "folder" && droppingTest.id === "file") {
                setDragzoneError('Cannot move a folder into a file')
                return
            } else if (draggableTest.id === "file" && droppingTest.id === "file") {
                return setDragzoneError('Cannot move a file into a file')
            } else {
                if (!draggableTest.firstChild.innerText) return setDragzoneError('Cannot move an unnamed item')
                return logic.updatePositions(draggableTest.firstChild.innerText, Number(droppingTest.id))
                    .then(() => handleDivs())
                    .catch(err => {
                        setDragzoneError(err)
                    })
            }
        } else {
            if (dropItem[1] === "folder") {
                let newFolderName = dropItem[0].split('/').reverse()[0]
                let newFolderPath = '/' + newFolderName
                return logic.moveDir(dropItem[0], newFolderPath)
                    .then(() => {
                        setItemChanged(dropItem)
                        return handleDivs()})
                    .catch(err => {
                        setDragzoneError(err)
                    })
            } else if (dropItem[1] === "file") {
                let newFileName = dropItem[0].split('/').reverse()[0]
                let newFilePath = '/' + newFileName
                return logic.moveFile(dropItem[0], newFilePath)
                    .then(() => {
                        setItemChanged(dropItem)
                        return handleDivs()})
                    .catch(err => {
                        setDragzoneError(err)
                    })
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
            .catch(err => {
                setDragzoneError(err)
            })
    }

    return <section className="dragzone" ref={dragzone}>
        {divs}
    </section>
}

export default Dragzone