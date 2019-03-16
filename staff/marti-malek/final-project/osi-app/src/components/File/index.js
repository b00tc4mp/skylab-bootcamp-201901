import React, { useRef, useState } from 'react'
import logic from '../../logic'
import './index.sass'

function File({ name, file, filePath, closeFile, showMenu, saveFile }) {

    let newText = useRef()
    let [openMenu, setOpenMenu] = useState(false)
    let [fileContent, setFileContent] = useState(null)
    
    saveFile = () => {
        fileContent = newText.current.innerText
        setFileContent(newText.current.innerText)
        // debugger
        return logic.updateFile(filePath, fileContent)
            .then(() => showMenu())
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
        setOpenMenu(old => !old)
    }

    return <section className="file">
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