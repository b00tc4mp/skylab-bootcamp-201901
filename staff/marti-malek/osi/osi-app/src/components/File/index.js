import React, { useRef, useState } from 'react'
import logic from '../../logic'
import './index.sass'

function File({ name, file, filePath, closeFile, showMenu, saveFile, onDrag, onDragStart, dragEnd, fileFeedback }) {

    let newText = useRef()
    let [openMenu, setOpenMenu] = useState(false)
    let [fileContent, setFileContent] = useState(null)
    let posX
    let posY
    
    saveFile = () => {
        fileContent = newText.current.innerText
        setFileContent(newText.current.innerText)
        // debugger
        return logic.updateFile(filePath, fileContent)
            .then(() => showMenu())
            .catch(err => {
                fileFeedback(err)
            })
    }

    // if (newText.current) {
    //     newText.current.addEventListener('keyup', e => {
    //         if (e.key === 'Enter') {
    //             debugger
    //             setFileContent(content => content + '\n')
    //         }
    //     })
    // }

    showMenu = () => {
        openMenu = !openMenu
        setOpenMenu(old => !old)
        if (openMenu === true) setTimeout(() => setOpenMenu(old => !old), 3000)
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
        e.target.style.top = ((e.target.offsetTop - top)) + 'px'
        e.target.style.left = ((e.target.offsetLeft - right)) + 'px'
    }

    dragEnd = e => {
        let right = posX - e.clientX
        let top = posY - e.clientY
        posX = e.clientX
        posY = e.clientY
        e.target.style.top = ((e.target.offsetTop - top)) + 'px'
        e.target.style.left = ((e.target.offsetLeft - right)) + 'px'
    }

    return <section className="file" draggable onDrag={e => onDrag(e)} onDragStart={e => onDragStart(e)} onDragEnd={dragEnd}>
        <header className="file__header"><i className="fas fa-times" onClick={closeFile}></i>
            <p>{name}</p>
        </header>
        <div className="file__top">
            <div className="file__top__file" onClick={() => showMenu()}>File</div>
            {
                openMenu && <div className="file__top__menu">
                    <div className="file__top__menu__item" onClick={() => saveFile()}>Save</div>
                </div>
            }
        </div>
        <div className="file__content" ref={newText} contentEditable="true">
            {file}
        </div>
    </section>
}

export default File