import React, { useState, useRef, useEffect } from 'react'
import './index.sass'
import logic from '../../logic';

function Dragzone({ onDragStart, onDrop, allowDrop, dir, handleDivs, pos, changeName, handleName, onTrashDrop, checkNews }) {

    let [divs, setDivs] = useState(new Array(48).fill(null))
    // let [newName, setNewName] = useState(null)
    let newNameTest = null
    let oldNameTest

    let i = 0

    let draggableTest
    let droppingTest

    let dragzone = useRef()

    useEffect(() => {
        checkNews()
        handleDivs()
    }, [dir])

    useEffect(() => {
        checkNews()
    }, [divs])

    checkNews = () => {
        if (document.querySelector('#inputId')) {
            var elems = document.querySelectorAll('#inputId')
            elems.forEach(elem => {
                if (elem.innerHTML === ".newFile" || elem.innerHTML === ".newFolder") {
                    elem.addEventListener('click', e => {
                        return changeName(e)
                    })
                    elem.click()
                }
            })
        }
    }

    handleName = (e, parent) => {
        newNameTest = e.target.value
        let oldName
        return logic.retrieveFile('.position.json')
            .then(positions => {
                let newPos = positions.map(elem => {
                    if ((elem.position == e.target.parentElement.parentElement.parentElement.id || elem.position == e.target.parentElement.parentElement.id) && elem.name === oldNameTest) {
                        oldName = elem.name
                        elem.name = newNameTest
                        return elem
                    } else return elem
                })
                return newPos
            })
            .then(newPos => {
                pos = newPos
                return logic.updatePositions(newPos)
            })
            .then(() => {
                logic.rename(oldName, newNameTest)
            })
            .then(() => {
                let newP = document.createElement('p')
                newP.name = "newP"
                newP.className = "name"
                newP.innerHTML = newNameTest
                parent.replaceChild(newP, e.target)
                return handleDivs()
            })
    }

    changeName = (e) => {
        e.currentTarget.childNodes.forEach(child => {
            oldNameTest = child.data !== undefined ? child.data : e.currentTarget.firstChild.firstChild.innerText !== "" ? e.currentTarget.firstChild.firstChild.innerText : '.newFolder'
        })
        let newInput = document.createElement('input')
        newInput.name = "newName"
        newInput.type = "text"
        newInput.id = "inputId"
        newInput.className = "nameInput"
        newInput.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                handleName(e, e.target.parentElement)
            }
        })
        if (e.target.className === "nameInput") return
        e.target.replaceChild(newInput, e.target.firstChild)
        newInput.focus()
    }

    handleDivs = () => {
        logic.retrieveFile('.position.json')
            .then(positions => pos = positions)
        setDivs(divs.map((div, index) => {
            if (pos[index]) {
                if (pos[index].type === 'folder') {
                    return <div className="droppable" key={index} keys={index} id={index} onClick={(e) => changeName(e)} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}>
                        <span id={pos[index].type} keys={`span${index}`} className="fas fa-folder fa-3x dragzone__folder" draggable="true" onDragStart={(e) => onDragStart(e)}>
                            <p className="name" id="inputId">{`${pos[index].name}`}</p>
                        </span>
                    </div>
                } else if (pos[index].type === 'file') {
                    return <div className="droppable" key={index} keys={index} id={index} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}>
                        <span id={pos[index].type} keys={`span${index}`} className="fas fa-file fa-3x dragzone__folder" draggable="true" onDragStart={(e) => onDragStart(e)}>
                            <p className="name">{pos[index].name}</p>
                        </span>
                    </div>
                } else if (index === 47) {
                    return <div className="droppable" key={index} keys={index} id={index} onDrop={(e) => onTrashDrop(e)} onDragOver={(e) => allowDrop(e)}><span className="fas fa-trash-alt fa-2x"></span></div>
                } else {
                    return <div className="droppable" key={index} keys={index} id={index} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}><span></span></div>
                }
            } else {
                return <div className="droppable" key={index} keys={index} id={`div${index}`} onDrop={(e) => onDrop(e)} onDragOver={(e) => allowDrop(e)}><span></span></div>
            }
        }))
    }


    onDragStart = ev => {
        draggableTest = ev.target
        ev.dataTransfer.setData("text/plain", ev.target.firstChild.innerText ? ev.target.firstChild.innerText : ev.target.firstChild.firstChild.innerText)
    }

    allowDrop = async ev => {
        ev.preventDefault()
        droppingTest = ev.target.id
    }

    onTrashDrop = ev => {
        // let span = document.createElement('span')
        // draggableTest.parentElement.replaceChild(span, draggableTest)
        let folderName = ev.dataTransfer.getData("text")
        // remove element from position.json
        return logic.removeDir(folderName)
            .then(() => logic.retrieveFile('.position.json'))
            .then(positions => {
                let newPositions = positions.map(position => {
                    if (position.name === folderName) return { position: null, type: null, name: null }
                    else return position
                })
                pos = newPositions
                return newPositions
            })
            .then(positions => logic.updatePositions(positions))
            .then(() => handleDivs())
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
                    let newName = elem.firstChild.firstChild.innerText
                    return { position: index, type: elem.firstChild.id, name: newName } // TODO
                } else return { position: null, type: null, name: null }
            } else {
                return { position: null, type: null, name: null }
            }
        })
        return logic.updatePositions(newPositions)
    }


    return <section className="dragzone" ref={dragzone}>
        {divs}
    </section>
}

export default Dragzone