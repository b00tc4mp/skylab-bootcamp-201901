import React, { useEffect, useState } from 'react'
import Toolbar from '../Toolbar'
import Clock from '../Clock'
import Todos from '../Todos'
import Dragzone from '../Dragzone'
import File from '../File'
import Menu from '../Menu'
import Finder from '../Finder'
import logic from '../../logic'
import './index.sass'

function Desktop({ handleState, handleNewFolder, handleNewFile, openDir, closeFinder, openFinderRoot, refreshFinder, openMenu, logOut, openFile, closeFile, dragStart, openFileFromFinder }) {

    let [level, setLevel] = useState([])
    let [positions, setPositions] = useState([])
    let [finder, setFinder] = useState(null)
    let [finderOpen, setFinderOpen] = useState(false)
    let [showMenu, setShowMenu] = useState(false)
    let [menuX, setMenuX] = useState(null)
    let [menuY, setMenuY] = useState(null)
    let [fileOpen, setFileOpen] = useState(null)
    let [fileContent, setFileContent] = useState(null)
    let [fileName, setFileName] = useState(null)
    let [filePath, setFilePath] = useState(null)
    let finderItem

    useEffect(() => {
        handleState()
    }, [])

    handleState = () => {
        return logic.retrieveLevel('/')
            .then(positionsArray => {
                setPositions(positionsArray.children)
            })
            .then(() => logic.retrieveDir('/'))
            .then(dir => {
                setLevel(dir)
            })
    }

    handleNewFolder = () => {
        return logic.createDir('/_newFolder')
            .then(() => logic.retrieveLevel('/'))
            .then(newPositions => {
                setLevel(newPositions.children)
            })
            .then(() => handleState())
    }

    handleNewFile = () => {
        let fileContent = {
            type: ".txt",
            content: ""
        }
        return logic.createFile(fileContent,'/_newFile')
            .then(() => logic.retrieveLevel('/'))
            .then(newPositions => {
                setLevel(newPositions.children)
            })
            .then(() => handleState())
    }

    openDir = (e) => {
        let dirPath = '/' + e.target.firstChild.innerText
        return logic.retrieveLevel(dirPath)
            .then(content => {
                setFinderOpen(true)
                setFinder(content)
            })
    }

    openFile = async e => {
        let newFilePath = '/' + e.target.firstChild.innerText
        await setFileName(e.target.firstChild.innerText)
        // console.log(fileName)
        // filePath = newFilePath
        await setFilePath(newFilePath)
        return logic.retrieveFile(newFilePath)
            .then(content => {
                setFileContent(content)
                setFileOpen(true)
            })
    }

    openFileFromFinder = path => {
        setFileName(path.split('/').reverse()[0])
        // console.log(fileName)
        // filePath = newFilePath
        setFilePath(path)
        return logic.retrieveFile(path)
            .then(content => {
                setFileContent(content)
                setFileOpen(true)
            })
    }

    openFinderRoot = () => {
        return logic.retrieveLevel('/')
            .then(content => {
                setFinderOpen(true)
                setFinder(content)
            })
    }

    closeFinder = () => {
        setFinderOpen(false)
    }

    closeFile = () => {
        setFileOpen(false)
    }

    // TODO
    refreshFinder = () => {

    }

    openMenu = (e) => {
        setMenuX(e.clientX)
        setMenuY(e.clientY)
        setShowMenu(true)
    }

    logOut = () => {
        return logic.logOutUser()
    }

    dragStart = e => {
        finderItem = e.target
        // setFinderItem(finderItem)
        debugger
    }

    return <section className="desktop">
        <div className="desktop__clock">
            <Clock></Clock>
        </div>
        <div className="desktop__todos">
            <Todos></Todos>
        </div>
        <div className="desktop__toolbar">
            <Toolbar newFolder={handleNewFolder} newFile={handleNewFile} openFinder={openFinderRoot} openMenu={openMenu}></Toolbar>
        </div>
        <div className="desktop__dragzone">
            <Dragzone dir={level} pos={positions} openDir={openDir} openFile={openFile} refresh={refreshFinder} dragItem={finderItem}></Dragzone>
        </div>
        {
            finder && finderOpen ? <Finder content={finder} close={closeFinder} dragStart={dragStart} openFileFromFinder={openFileFromFinder}></Finder> : null
        }
        {
            showMenu ? <Menu menuX={menuX} menuY={menuY} logOut={logOut}></Menu> : null
        }
        {
            fileOpen ? <File file={fileContent} filePath={filePath} name={fileName} closeFile={closeFile}></File> : null
        }
    </section>
}

export default Desktop