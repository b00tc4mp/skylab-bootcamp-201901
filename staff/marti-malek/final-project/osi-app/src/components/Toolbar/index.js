import React from 'react'
import './index.sass'

function Toolbar({ newFolder, newFile, openFinder, openMenu }) {

    return <section className="toolbar">
        <div className="toolbar__logo" onClick={(e) => openMenu(e)}></div>
        {/* <image className="toolbar__logo__image" alt="Metallic logo" width="42" height="42" src="../../media/logo.png"></image> */}
        <div className="toolbar__file" onClick={() => newFile()}><i className="icon fas fa-file"><i className="sub-icon fas fa-plus"></i></i></div>
        <div className="toolbar__folder" onClick={() => newFolder()}><i className="icon fas fa-folder-plus"></i></div>
        <div className="toolbar__calc"><i className="icon fas fa-calculator"></i></div>
        <div className="toolbar__finder" onClick={() => openFinder()}><i className="icon fas fa-search"></i></div>
    </section>
}

export default Toolbar