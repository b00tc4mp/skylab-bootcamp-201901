import React from 'react'
import './index.sass'

function Toolbar({ newFolder, newFile }) {

    return <section className="toolbar">
        <div className="toolbar__logo"></div>
        <div className="toolbar__file" onClick={() => newFile()}><i className="icon fas fa-file"><i className="sub-icon fas fa-plus"></i></i></div>
        <div className="toolbar__folder" onClick={() => newFolder()}><i className="icon fas fa-folder-plus"></i></div>
        <div className="toolbar__calc"><i className="icon fas fa-calculator"></i></div>
        <div className="toolbar__finder"><i className="icon fas fa-search"></i></div>
    </section>
}

export default Toolbar